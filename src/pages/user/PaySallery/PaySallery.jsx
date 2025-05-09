import React, { useEffect, useState } from "react";
import "./PaySallery.css";
import Header from "../../../components/Header/Header";

export default function PaySallery() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedDate, setSelectedDate] = useState({
    day: "",
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 51 }, (_, i) => 2000 + i);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    setEmployees(users);

    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    setIsLoading(true);
    filterUnpaidEmployees(users, month, year);
  }, []);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setSelectedDate((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmDate = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { month, year } = selectedDate;
    setTimeout(() => {
      filterUnpaidEmployees(employees, +month, +year);
    }, 500);
  };

  const calculateNetSalary = (emp, bonuses, deductions, loanMonthly) => {
    const totalDeductions = deductions + loanMonthly;
    return +emp.salary + bonuses - totalDeductions;
  };

  const filterUnpaidEmployees = (empList, month, year) => {
    const filtered = empList.filter((emp) => {
      const history = emp.salaryHistory || [];
      return !history.some(
        (entry) => +entry.month === +month && +entry.year === +year
      );
    });

    const result = filtered.map((emp) => {
      const incentives = emp.incentives || [];
      let bonuses = 0;
      let deductions = 0;
      let loanMonthly = 0;

      incentives.forEach((item) => {
        const itemMonth = new Date(item.date).getMonth() + 1;
        const itemYear = new Date(item.date).getFullYear();

        if (+itemMonth === +month && +itemYear === +year) {
          if (item.itemEffect === "حوافز علي الراتب") bonuses += +item.amount;
          else if (item.itemEffect === "خصم من الراتب")
            deductions += +item.amount;
        }

        if (item.itemEffect === "سلفة علي الراتب") {
          const loanStartMonth = new Date(item.date).getMonth() + 1;
          const loanStartYear = new Date(item.date).getFullYear();
          const monthsPassed =
            (year - loanStartYear) * 12 + (month - loanStartMonth);
          const totalInstallments = Math.ceil(
            +item.amount / +item.monthlyDeduction
          );

          if (monthsPassed >= 0 && monthsPassed < totalInstallments) {
            loanMonthly += +item.monthlyDeduction;
          }
        }
      });

      const net = calculateNetSalary(emp, bonuses, deductions, loanMonthly);

      return {
        id: emp.id,
        name: `${emp.firstName} ${emp.lastName}`,
        job: emp.userType,
        salary: +emp.salary,
        bonuses,
        deductions,
        loans: loanMonthly,
        net,
        notes: "",
      };
    });

    setFilteredEmployees(result);
    setIsLoading(false);
  };

  const handleSave = () => {
    const updatedEmployees = [...employees];
    const paymentDate = new Date().toLocaleDateString("en-EG");
    const { month, year } = selectedDate;

    updatedEmployees.forEach((emp) => {
      const employeeHistory = emp.salaryHistory || [];
      const incentives = emp.incentives || [];

      let bonuses = 0;
      let deductions = 0;
      let loanMonthly = 0;

      incentives.forEach((item) => {
        const itemMonth = new Date(item.date).getMonth() + 1;
        const itemYear = new Date(item.date).getFullYear();

        if (+itemMonth === +month && +itemYear === +year) {
          if (item.itemEffect === "حوافز علي الراتب") bonuses += +item.amount;
          else if (item.itemEffect === "خصم من الراتب")
            deductions += +item.amount;
        }

        if (item.itemEffect === "سلفة علي الراتب") {
          const loanStartMonth = new Date(item.date).getMonth() + 1;
          const loanStartYear = new Date(item.date).getFullYear();
          const monthsPassed =
            (year - loanStartYear) * 12 + (month - loanStartMonth);
          const totalInstallments = Math.ceil(
            +item.amount / +item.monthlyDeduction
          );

          if (
            monthsPassed >= 0 &&
            monthsPassed < totalInstallments &&
            item.remainingAmount > 0
          ) {
            const deduction = Math.min(
              +item.monthlyDeduction,
              +item.remainingAmount
            );
            loanMonthly += deduction;

            // تحديث البيانات داخل السلفة
            item.remainingAmount = +item.remainingAmount - deduction;
            item.paidInstallments = (+item.paidInstallments || 0) + 1;
          }
        }
      });

      const netSalary = calculateNetSalary(
        emp,
        bonuses,
        deductions,
        loanMonthly
      );

      const newSalaryRecord = {
        month,
        year,
        salary: emp.salary,
        bonuses,
        deductions,
        loans: loanMonthly,
        net: netSalary,
        paymentDate,
        notes: "",
      };

      employeeHistory.push(newSalaryRecord);
      emp.salaryHistory = employeeHistory;
    });

    localStorage.setItem("users", JSON.stringify(updatedEmployees));
    alert("تم حفظ البيانات بنجاح ✅");
  };

  return (
    <div className="container-fluid p-3">
      <div className="PaySallery">
        <Header text="صرف الرواتب" />
        <div className="form">
          <h5 className="table-title">صرف الرواتب لشهر</h5>
          <form className="salary-form my-4" onSubmit={handleConfirmDate}>
            <div className="mb-3">
              <label className="form-label">التاريخ:</label>
              <div className="row g-2">
                <div className="col-12 col-sm-3">
                  <label className="form-label">يوم</label>
                  <select
                    className="form-select"
                    name="day"
                    value={selectedDate.day}
                    onChange={handleDateChange}
                  >
                    <option value="">--</option>
                    {days.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-12 col-sm-3">
                  <label className="form-label">شهر</label>
                  <select
                    className="form-select"
                    name="month"
                    value={selectedDate.month}
                    onChange={handleDateChange}
                  >
                    {months.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-12 col-sm-3">
                  <label className="form-label">سنة</label>
                  <select
                    className="form-select"
                    name="year"
                    value={selectedDate.year}
                    onChange={handleDateChange}
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="d-flex align-items-end justify-content-center col-12 col-sm-3">
                  <button type="submit" className="pay-ok btn">
                    تأكيد
                  </button>
                </div>
              </div>
            </div>
          </form>

          <div className="table-responsive">
            <table className="pay-sallery-table table table-bordered table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>الاسم</th>
                  <th>الوظيفة</th>
                  <th>الراتب</th>
                  <th>حوافز</th>
                  <th>خصومات</th>
                  <th>القسط الشهري</th>
                  <th>الصافي</th>
                  <th>الملاحظات</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="10" className="text-center">
                      جاري التحميل...
                    </td>
                  </tr>
                ) : (
                  filteredEmployees.map((emp, index) => (
                    <tr key={emp.id}>
                      <td>{index + 1}</td>
                      <td>{emp.name}</td>
                      <td>{emp.job}</td>
                      <td>{emp.salary.toFixed(2)}</td>
                      <td>{emp.bonuses.toFixed(2)}</td>
                      <td>{emp.deductions.toFixed(2)}</td>
                      <td>{emp.loans.toFixed(2)}</td>
                      <td>{emp.net.toFixed(2)} جنيه</td>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="ملاحظات"
                          value={emp.notes}
                          onChange={(e) => {
                            const updatedEmployees = [...filteredEmployees];
                            updatedEmployees[index].notes = e.target.value;
                            setFilteredEmployees(updatedEmployees);
                          }}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {filteredEmployees.length > 0 && (
              <button
                type="button"
                className="btn pay-save"
                onClick={handleSave}
              >
                حفظ
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
