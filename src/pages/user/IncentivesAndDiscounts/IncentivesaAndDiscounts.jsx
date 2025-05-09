import React, { useEffect, useState } from "react";
import "./IncentivesaAndDiscounts.css";
import Header from "../../../components/Header/Header";
import Loading from "../../../components/Loading/Loading";

export default function IncentivesaAndDiscounts() {
  const [employees, setEmployees] = useState([]);
  const [salaryItems, setSalaryItems] = useState([]);
  const [selectedEffect, setSelectedEffect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    employee: { id: "", name: "" },
    amount: "",
    itemType: "",
    itemEffect: "",
    monthlyDeduction: "",
    reason: "",
    notes: "",
  });

  const getUser = JSON.parse(localStorage.getItem("users")) || [];
  const salaryItem = JSON.parse(localStorage.getItem("salaryItems")) || [];

  useEffect(() => {
    const employeeNames = getUser.map((user) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
    }));
    setEmployees(employeeNames);
    setSalaryItems(salaryItem);
  }, []);

  const calculateInstallmentMonths = (amount, monthly) => {
    if (!amount || !monthly) return 0;
    return Math.ceil(Number(amount) / Number(monthly));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "itemType") {
      const selectedItem = salaryItems.find((item) => item.nameItem === value);
      setFormData((prev) => ({
        ...prev,
        itemType: value,
        itemEffect: selectedItem?.itemEffect || "",
      }));
      setSelectedEffect(selectedItem?.itemEffect === "سلفة علي الراتب");
    } else if (name === "employee") {
      const selectedEmp = employees.find((emp) => emp.name === value);
      setFormData((prev) => ({
        ...prev,
        employee: {
          id: selectedEmp?.id || "",
          name: value,
        },
      }));
    } else {
      const updatedForm = { ...formData, [name]: value };

      // لو البند سلفة على الراتب يتم حساب عدد الشهور تلقائيًا
      if (
        formData.itemEffect === "سلفة علي الراتب" &&
        (name === "amount" || name === "monthlyDeduction")
      ) {
        const amount = name === "amount" ? value : formData.amount;
        const monthly = name === "monthlyDeduction" ? value : formData.monthlyDeduction;
        updatedForm.installmentMonths = calculateInstallmentMonths(amount, monthly);
      }

      setFormData(updatedForm);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    const updatedUsers = getUser.map((user) => {
      if (user.id === formData.employee.id) {
        const isLoan = formData.itemEffect === "سلفة علي الراتب";
        const totalLoan = Number(formData.amount);
        const monthlyDeduction = Number(formData.monthlyDeduction);
        const installmentMonths = isLoan
          ? calculateInstallmentMonths(totalLoan, monthlyDeduction)
          : 0;
  
        const newIncentive = {
          date: formData.date,
          amount: totalLoan,
          itemType: formData.itemType,
          itemEffect: formData.itemEffect,
          reason: formData.reason,
          notes: formData.notes,
        };
  
        if (isLoan) {
          Object.assign(newIncentive, {
            totalLoan: totalLoan,
            monthlyDeduction: monthlyDeduction,
            installmentMonths: installmentMonths,
            paidInstallments: 0,
            remainingAmount: totalLoan,
          });
        }
  
        return {
          ...user,
          incentives: [...(user.incentives || []), newIncentive],
        };
      }
      return user;
    });
  
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  
    // Reset form
    setFormData({
      date: "",
      employee: { id: "", name: "" },
      amount: "",
      itemType: "",
      itemEffect: "",
      monthlyDeduction: "",
      reason: "",
      notes: "",
    });
    setSelectedEffect(false);
  
    setTimeout(() => setIsLoading(false), 500);
  };
  
  return (
    <div className="IncentivesaAndDiscounts">
      <div className="container-fluid p-3">
        <Header text="تسجيل المكافات والسلف والخصومات" />
        {isLoading ? (
          <Loading />
        ) : (
          <div className="form">
            <form onSubmit={handleSubmit}>
              <div className="row mb-3 justify-content-between">
                <div className="col-md-5">
                  <label htmlFor="date" className="form-label">تاريخ الصرف</label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3 justify-content-between">
                <div className="col-md-5">
                  <label htmlFor="employee" className="form-label">الموظف</label>
                  <select
                    className="form-select"
                    id="employee"
                    name="employee"
                    value={formData.employee.name}
                    onChange={handleChange}
                    required
                  >
                    <option value="">اختر موظفًا</option>
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.name}>
                        {emp.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-5">
                  <label htmlFor="amount" className="form-label">المبلغ</label>
                  <input
                    type="number"
                    className="form-control"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3 justify-content-between">
                <div className="col-md-5">
                  <label htmlFor="itemType" className="form-label">البند</label>
                  <select
                    className="form-select"
                    id="itemType"
                    name="itemType"
                    value={formData.itemType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">اختر بندًا</option>
                    {salaryItems.map((item, index) => (
                      <option key={index} value={item.nameItem}>
                        {item.nameItem}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-5">
                  <label htmlFor="reason" className="form-label">السبب</label>
                  <input
                    type="text"
                    className="form-control"
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {selectedEffect && (
                <div className="row mb-3 justify-content-between">
                  <div className="col-md-5">
                    <label htmlFor="monthlyDeduction" className="form-label">قيمة الخصم الشهري</label>
                    <input
                      type="number"
                      className="form-control"
                      id="monthlyDeduction"
                      name="monthlyDeduction"
                      value={formData.monthlyDeduction}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="notes" className="form-label">ملاحظات</label>
                <textarea
                  className="form-control"
                  id="notes"
                  name="notes"
                  rows="2"
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-primary">حفظ</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
