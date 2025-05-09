import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

import "./addUser.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";

/*
  show, يحدد ما إذا كان المودال مفتوحًا أم لا (true لعرضه).
  setShow, دالة تستخدم لإغلاق أو فتح المودال (setShow(false) لإغلاقه).
  onAddUser,  دالة يتم استدعاؤها عند الضغط على "حفظ" لإضافة مستخدم جديد.
  onUpdateUser, دالة يتم استدعاؤها عند الضغط على "تعديل" لتحديث بيانات المستخدم الحالي.
  isEdit,  هل المودال يستخدم لتعديل مستخدم موجود (true) أو لإضافة جديد (false).
  editingUser,  
*/
export default function AddUser({
  show,
  setShow,
  onAddUser,
  onUpdateUser,
  isEdit,
  editingUser,
  users,
}) {
  const initialUserData = {
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    phoneNumber: "",
    address: "",
    image: "",
    details: "",
    userType: "",
    dateOfAppointment: "",
    // identificationNumber: "",
    salary: "",
    password: "",
    confirmPassword: "",
    salaryHistory: [],
  };

  const [userData, setUserData] = useState({ ...initialUserData });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // حالة إظهار كلمة المرور

  //  التغييرات في الحقول [1]
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // التحقق من كلمة المرور
  const getPasswordErrors = (password) => {
    if (password.length < 8) return "كلمة المرور يجب أن تكون 8 أحرف على الأقل";
    if (!/[a-z]/.test(password))
      return "كلمة المرور يجب أن تحتوي على حرف واحد على الأقل";
    if (!/[0-9]/.test(password))
      return "كلمة المرور يجب أن تحتوي على رقم واحد على الأقل";
    return "";
  };

  // التحقق العام للنموذج
  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "password",
      "confirmPassword",
      "address",
      // "identificationNumber",
      "dateOfAppointment",
      "gender",
      "phoneNumber",
      "userType",
      "salary",
    ];

    requiredFields.forEach((field) => {
      if (!userData[field]) newErrors[field] = "هذا الحقل مطلوب";
    });

    // تحقق من تطابق كلمة المرور فقط عند الإضافة
    if (!isEdit && userData.password !== userData.confirmPassword) {
      newErrors.confirmPassword = "كلمة المرور غير متطابقة";
    }

    // تحقق من قوة كلمة المرور (في الإضافة فقط)
    if (!isEdit && userData.password) {
      const passwordError = getPasswordErrors(userData.password);
      if (passwordError) newErrors.password = passwordError;
    }

    // التحقق من ان السالري يدخل رقم
    if (userData.salary && isNaN(userData.salary)) {
      newErrors.salary = "الرجاء إدخال رقم صالح للراتب";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    // التأكد من أن الراتب هو رقم
    const finalSalary = userData.salary ? Number(userData.salary) : 0;
  
    const finalUser = isEdit
      ? { ...userData, salary: finalSalary }
      : {
          id: users.length ? users[users.length - 1].id + 1 : 1,
          ...userData,
          salary: finalSalary,
        };
  
    isEdit ? onUpdateUser(finalUser) : onAddUser(finalUser);
  
    setShow(false);
    setUserData({ ...initialUserData });
  };
  

  useEffect(() => {
    setUserData(
      isEdit && editingUser ? { ...editingUser } : { ...initialUserData }
    );
    setErrors({});
  }, [isEdit, editingUser, show]);

  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {!isEdit ? "إضافة موظف جديد" : "تعديل بيانات الموظف"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form id="userForm" onSubmit={handleSubmit}>
          {/* الاسم الأول */}
          <div className="mb-3">
            <label htmlFor="firstName">الاسم الأول</label>
            <input
              className={`form-control mt-1 ${
                errors.firstName ? "is-invalid" : ""
              }`}
              id="firstName"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <div className="invalid-feedback">{errors.firstName}</div>
            )}
          </div>

          {/* اسم العائلة */}
          <div className="mb-3">
            <label htmlFor="lastName">اسم العائلة</label>
            <input
              className={`form-control mt-1 ${
                errors.lastName ? "is-invalid" : ""
              }`}
              id="lastName"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <div className="invalid-feedback">{errors.lastName}</div>
            )}
          </div>

          {/* البريد الإلكتروني */}
          <div className="mb-3">
            <label htmlFor="email">البريد الإلكتروني</label>
            <input
              type="email"
              className={`form-control mt-1 ${
                errors.email ? "is-invalid" : ""
              }`}
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              disabled={isEdit}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          {/* كلمة المرور وتأكيدها - تظهر فقط في حالة الإضافة */}
          {!isEdit && (
            <>
              <div className="mb-3">
                <label htmlFor="password">كلمة المرور</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`form-control mt-1 ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    name="password"
                    id="password"
                    value={userData.password}
                    onChange={handleChange}
                  />
                  <span
                    className="input-group-text mt-1"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </span>
                </div>
                {errors.password && (
                  <div className="invalid-feedback d-block">
                    {errors.password}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword">تأكيد كلمة المرور</label>
                <input
                  type={showPassword ? "text" : "password"} // تغيير النوع بناءً على حالة إظهار الباسورد
                  className={`form-control mt-1 ${
                    errors.confirmPassword ? "is-invalid" : ""
                  }`}
                  name="confirmPassword"
                  value={userData.confirmPassword}
                  onChange={handleChange}
                />

                {errors.confirmPassword && (
                  <div className="invalid-feedback">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
            </>
          )}

          {/* كود الموظف
          <div className="mb-3">
            <label htmlFor="identificationNumber" className="form-label">
              كود الموظف
            </label>
            <input
              type="text"
              className={`form-control mt-1 ${
                errors.identificationNumber ? "is-invalid" : ""
              }`}
              id="identificationNumber"
              name="identificationNumber"
              value={userData.identificationNumber}
              onChange={handleChange}
              disabled={isEdit}
            />
            {errors.identificationNumber && (
              <div className="invalid-feedback">
                {errors.identificationNumber}
              </div>
            )}
          </div> */}

          {/*  العنوان */}
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              العنوان{" "}
            </label>
            <input
              type="text"
              className={`form-control mt-1 ${
                errors.address ? "is-invalid" : ""
              }`}
              id="address"
              name="address"
              value={userData.address}
              onChange={handleChange}
            />
            {errors.address && (
              <div className="invalid-feedback">{errors.address}</div>
            )}
          </div>

          {/* النوع */}
          <div className="mb-3">
            <label htmlFor="gender">النوع</label>
            <select
              className={`form-select mt-1 ${
                errors.gender ? "is-invalid" : ""
              }`}
              name="gender"
              value={userData.gender}
              onChange={handleChange}
            >
              <option value="">اختر...</option>
              <option value="ذكر">ذكر</option>
              <option value="أنثى">أنثى</option>
            </select>
            {errors.gender && (
              <div className="invalid-feedback">{errors.gender}</div>
            )}
          </div>

          {/* رقم الهاتف */}
          <div className="mb-3">
            <label htmlFor="phoneNumber">رقم الهاتف</label>
            <input
              type="tel"
              className={`form-control mt-1 ${
                errors.phoneNumber ? "is-invalid" : ""
              }`}
              id="phoneNumber"
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && (
              <div className="invalid-feedback">{errors.phoneNumber}</div>
            )}
          </div>

          {/* تاريخ التعيين */}
          <div className="mb-3">
            <label htmlFor="dateOfAppointment">تاريخ التعيين</label>
            <input
              id="dateOfAppointment"
              type="date"
              className={`form-control mt-1 ${
                errors.dateOfAppointment ? "is-invalid" : ""
              }`}
              name="dateOfAppointment"
              value={userData.dateOfAppointment}
              onChange={handleChange}
            />
            {errors.dateOfAppointment && (
              <div className="invalid-feedback">{errors.dateOfAppointment}</div>
            )}
          </div>

          {/* الوظيفة */}
          <div className="mb-3">
            <label htmlFor="userType">الوظيفة</label>
            <select
              className={`form-select mt-1 ${
                errors.userType ? "is-invalid" : ""
              }`}
              name="userType"
              value={userData.userType}
              onChange={handleChange}
            >
              <option value="">اختر...</option>
              <option value="superadmin">مدير</option>
              <option value="employee">بائع</option>
            </select>
            {errors.userType && (
              <div className="invalid-feedback">{errors.userType}</div>
            )}
          </div>

          {/* الراتب */}
          <div className="mb-3">
            <label htmlFor="salary">الراتب</label>
            <input
              type="number"
              className={`form-control mt-1 ${
                errors.salary ? "is-invalid" : ""
              }`}
              name="salary"
              value={userData.salary ? Number(userData.salary) : ''}
              onChange={handleChange}
            />
            {errors.salary && (
              <div className="invalid-feedback">{errors.salary}</div>
            )}
          </div>

          {/* التفاصيل */}
          <div className="mb-3">
            <label className="form-label">تفاصيل إضافية</label>
            <textarea
              className="form-control mt-1"
              name="details"
              value={userData.details}
              onChange={handleChange}
              rows="3"
            />
          </div>
          <div>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShow(false)}
            >
              إغلاق
            </button>
            <button type="submit" className="btn btn-primary save">
              {isEdit ? "تعديل" : "حفظ"}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
