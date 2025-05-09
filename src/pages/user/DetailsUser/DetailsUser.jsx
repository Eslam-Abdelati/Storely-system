import React, { useEffect, useState } from "react";
import "./detailsuser.css";
import { useParams } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Loading from "../../../components/Loading/Loading";

export default function DetailsUser() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [selectedDate, setSelectedDate] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const selectedUser = savedUsers.find((user) => user.id == id);
    // console.log(selectedUser);

    setEmployee(selectedUser);
  }, [id]);

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 51 }, (_, i) => 2000 + i);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setSelectedDate((prev) => ({ ...prev, [name]: value }));
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  if (!employee) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <p className="text-danger">لم يتم العثور على الموظف.</p>
      </div>
    );
  }

  const currentSalary = employee.salary || 0; // راتب الشخص الاساسي
  const history = employee.salaryHistory || []; // جدول القبض

  // ايجاد الشهر  المسجل بناءا علي التاريخ المخار  لو مثلا ( شهر 1 المختار يساوي شهر 1 في السالري هستروي يرجعه )
  const currentMonthData = history.find(
    (s) =>
      parseInt(s.month) === parseInt(selectedDate.month) &&
      parseInt(s.year) === parseInt(selectedDate.year)
  );
  // console.log("currentMonthData", currentMonthData);

  // البيانات الموجوده داخل السالري هستري لهذا الشهر
  const basicSalary = parseFloat(currentSalary);
  const bonuses = parseFloat(currentMonthData?.bonuses || 0);
  const deductions = parseFloat(currentMonthData?.deductions || 0);
  const loan = parseFloat(currentMonthData?.loan || 0);
  const paymentDate = new Date(currentMonthData?.date).toLocaleDateString(
    "en-EG",
    {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }
  );

  const netSalary = basicSalary + bonuses - deductions - loan;

  const handlePaySalary = () => {
    setIsLoading(true);
    setTimeout(() => {
      const updatedUsers = JSON.parse(localStorage.getItem("users")) || [];
      const userIndex = updatedUsers.findIndex((u) => u.id == employee.id);
      if (userIndex === -1) return;

      const now = new Date();

      const newSalaryRecord = {
        month: parseInt(selectedDate.month),
        year: parseInt(selectedDate.year),
        salary: basicSalary,
        bonuses: bonuses,
        deductions: deductions,
        loans: loan,
        net: basicSalary,
        date: now.toISOString(),
      };

      // إضافة السجل الجديد لتاريخ الرواتب
      updatedUsers[userIndex].salaryHistory = [
        ...(updatedUsers[userIndex].salaryHistory || []),
        newSalaryRecord,
      ];

      // حفظ البيانات
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setEmployee(updatedUsers[userIndex]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <>
      {isLoading && <Loading />} {/* يظهر اللودنج هنا */}
      <div className="container-fluid p-3">
        <div className="details-user">
          <Header text="تفاصيل المستخدم" />

          <div className="form">
            <div className="">
              <div className="table-responsive">
                <table className="table table-bordered table-striped table-details">
                  <thead className="table-primary text-center">
                    <tr>
                      <th
                        colSpan="4"
                        style={{ fontSize: "20px", fontWeight: "500" }}
                      >
                        بيانات الموظف
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>الاسم</th>
                      <td>
                        {employee.firstName} {employee.lastName}
                      </td>
                      <th>رقم الهاتف</th>
                      <td>{employee.phoneNumber}</td>
                    </tr>
                    <tr>
                      <th>البريد الإلكتروني</th>
                      <td>{employee.email}</td>
                      <th>النوع</th>
                      <td>{employee.gender}</td>
                    </tr>
                    <tr>
                      <th>الوظيفة</th>
                      <td>{employee.userType}</td>
                      <th>العنوان</th>
                      <td>{employee.address}</td>
                    </tr>
                    <tr>
                      <th>الراتب</th>
                      <td>{employee.salary} جنيه</td>
                      <th>تاريخ التعيين</th>
                      <td>{employee.dateOfAppointment}</td>
                    </tr>
                    <tr>
                      <th>كود الموظف</th>
                      <td>{employee.identificationNumber}</td>
                      <th>تفاصيل إضافية</th>
                      <td>{employee.details || "لا يوجد"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="box-salary p-4">
              <div className="header row">
                <div className="col-12 col-sm-3">
                  <h5>صرف راتب</h5>
                </div>
                <div className="col-12 col-sm-3 d-flex align-items-center">
                  <label className="form-label ms-2">شهر</label>
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
                <div className="col-12 col-sm-3 d-flex align-items-center">
                  <label className="form-label ms-2">سنة</label>
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
                <div className="col-12 col-sm-3 d-flex align-items-center">
                  <label className="form-label ms-2">خزينة</label>
                  <select className="form-select" name="Money">
                    <option>--</option>
                  </select>
                </div>
              </div>

              <div className="table-responsive mt-4">
                <table className="table table-bordered table-striped table-hover">
                  <thead>
                    <tr>
                      <th>الراتب الأساسي</th>
                      <th>حوافز</th>
                      <th>خصومات</th>
                      <th>سلفة شهرية</th>
                      <th>الصافي</th>
                      <th>ملاحظات</th>
                      <th>صرف</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan="7" className="text-center text-info fw-bold">
                          جاري التحميل...
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td>{basicSalary.toFixed(2)} جنيه</td>
                        <td>{bonuses.toFixed(2)} جنيه</td>
                        <td>{deductions.toFixed(2)} جنيه</td>
                        <td>{loan.toFixed(2)} جنيه</td>
                        <td>{netSalary.toFixed(2)} جنيه</td>
                        <td>--</td>
                        <td>
                          {!currentMonthData ? (
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() => handlePaySalary()}
                            >
                              صرف
                            </button>
                          ) : (
                            `صرف بتاريخ ${paymentDate}`
                          )}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="details-user-salary mt-3">
              <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover">
                  <thead className="table-primary">
                    <tr>
                      <th>تاريخ الصرف</th>
                      <th>البند</th>
                      <th>المبلغ</th>
                      <th>السبب</th>
                      <th>ملاحظات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employee.salaryHistory &&
                      employee.salaryHistory.map((user, index) => (
                        <React.Fragment key={index}>
                          <tr>
                            <td>
                              {new Date(user.date).toLocaleDateString("en-EG", {
                                year: "numeric",
                                month: "numeric",
                                day: "numeric",
                              })}
                            </td>
                            <td>
                              راتب شهر {user.month} / {user.year}
                            </td>
                            <td>{parseFloat(user.net || 0).toFixed(2)} جنيه</td>
                            <td></td>
                            <td></td>
                          </tr>
                          {parseFloat(user.bonuses || 0) > 0 && (
                            <tr>
                              <td>
                                {new Date(user.date).toLocaleDateString("en-EG", {
                                  year: "numeric",
                                  month: "numeric",
                                  day: "numeric",
                                })}
                              </td>
                              <td>حافز</td>
                              <td>{parseFloat(user.bonuses).toFixed(2)} جنيه</td>
                              <td></td>
                              <td></td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
