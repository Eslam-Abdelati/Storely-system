// import React, { useRef, useState } from "react";
// import "flatpickr/dist/flatpickr.min.css";
// import "./createUser.css";
// import {
//   AddCircle,
//   CheckCircleOutline,
//   Save,
//   UploadFile,
// } from "@mui/icons-material";
// import { Link } from "react-router-dom";

// export default function CreateUser() {
//   const initialUserData = {
//     firstName: "",
//     lastName: "",
//     gender: "",
//     email: "",
//     phoneNumber: "",
//     address: "",
//     image: "",
//     details: "",
//     userType: "",
//     department: "",
//     dateOfAppointment: "",
//     contractType: "",
//     identificationNumber: "",
//     salary: "",
//     password: "",
//     confirmPassword: "",
//   };

//   const [userData, setUserData] = useState({ ...initialUserData });
//   const [image, setImage] = useState(null);
//   const [showAlert, setShowAlert] = useState(false);
//   const fileInputRef = useRef(null);

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files[0];
//     if (file && file.type.startsWith("image/")) {
//       setImage(file);
//     }
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file && file.type.startsWith("image/")) {
//       setImage(file);
//     }
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setUserData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
//     const newUsers = [...existingUsers, userData];
//     localStorage.setItem("users", JSON.stringify(newUsers));
//     setUserData({ ...initialUserData });
//     setImage(null);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//     // Show alert

//     setShowAlert(true);
//     setTimeout(() => {
//       setShowAlert(false);
//     }, 5000);
//   };
//   return (
//     <div className="users-page">
//       {/* راس الصفحة */}
//       <div className="header">
//         <div>
//           <h5>
//             تعيين موظف جديد
//             <AddCircle className="me-2" />
//           </h5>
//         </div>
//         <div>
//           <button
//             type="submit"
//             form="userForm"
//             className="d-flex align-items-center save"
//           >
//             <p className="icon">
//               <Save />
//             </p>
//             <p className="bt">حفظ</p>
//           </button>
//         </div>
//         <Link to="/users" >عرض</Link>
//       </div>

//       <div className="container-fluid users-page-content">
//         {/* ✅ التنبيه */}
//         <div
//           className={`alert alert-slide d-flex align-items-center w-100 mt-3 ${
//             showAlert ? "show bg-success-subtle" : ""
//           }`}
//         >
//           <CheckCircleOutline className="alert-icon text-success" />
//           <p className="me-2 text-success-emphasis alert-info">
//             تم إضافة موظف جديد
//           </p>
//         </div>

//         {/* الفورم */}
//         <div className="form-user">
//   <form onSubmit={handleSubmit} id="userForm">
//     <div className="row">
//       {/* القسم الأيمن */}
//       <div className="col-lg-6 col-md-12">
//         {/* البيانات الشخصية */}
//         <div className="card mb-4">
//           <div className="card-header section-header">البيانات الشخصية</div>
//           <div className="card-body row g-3">
//             <div className="col-md-6">
//               <label htmlFor="firstName" className="form-label">
//                 الاسم الأول <span className="text-danger">*</span>
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="firstName"
//                 name="firstName"
//                 value={userData.firstName}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="col-md-6">
//               <label htmlFor="lastName" className="form-label">
//                 اسم العائلة <span className="text-danger">*</span>
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="lastName"
//                 name="lastName"
//                 value={userData.lastName}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="col-md-6">
//               <label htmlFor="gender" className="form-label">
//                 النوع <span className="text-danger">*</span>
//               </label>
//               <select
//                 className="form-select"
//                 id="gender"
//                 name="gender"
//                 value={userData?.gender || ""}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">اختر النوع...</option>
//                 <option value="ذكر">ذكر</option>
//                 <option value="أنثى">أنثى</option>
//               </select>
//             </div>
//             <div className="col-md-6">
//               <label htmlFor="email" className="form-label">
//                 البريد الإلكتروني <span className="text-danger">*</span>
//               </label>
//               <input
//                 type="email"
//                 className="form-control"
//                 id="email"
//                 name="email"
//                 value={userData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="col-md-6">
//               <label htmlFor="phoneNumber" className="form-label">
//                 رقم الهاتف <span className="text-danger">*</span>
//               </label>
//               <input
//                 type="tel"
//                 className="form-control"
//                 id="phoneNumber"
//                 name="phoneNumber"
//                 value={userData.phoneNumber}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="col-md-6">
//               <label htmlFor="address" className="form-label">
//                 العنوان <span className="text-danger">*</span>
//               </label>
//               <textarea
//                 className="form-control"
//                 rows="1"
//                 id="address"
//                 name="address"
//                 value={userData.address}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//              <div className="col-md-6">
//               <label htmlFor="password" className="form-label">
//                 كلمة المرور <span className="text-danger">*</span>
//               </label>
//               <input
//                 type="password"
//                 className="form-control"
//                 id="password"
//                 name="password"
//                 value={userData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="col-md-6">
//               <label htmlFor="confirmPassword" className="form-label">
//                 تأكيد كلمة المرور <span className="text-danger">*</span>
//               </label>
//               <input
//                 type="password"
//                 className="form-control"
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 value={userData.confirmPassword}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* القسم الأيسر */}
//       <div className="col-lg-6 col-md-12">
//         {/* بيانات الوظيفة */}
//         <div className="card mb-4">
//           <div className="card-header section-header">بيانات الوظيفة</div>
//           <div className="card-body row g-3">
//             <div className="col-md-6">
//               <label htmlFor="userType" className="form-label">
//                 الوظيفة <span className="text-danger">*</span>
//               </label>
//               <select
//                 className="form-select"
//                 id="userType"
//                 name="userType"
//                 value={userData?.userType || ""}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">اختر...</option>
//                 <option value="superadmin">مدير</option>
//                 <option value="employee">بائع</option>
//               </select>
//             </div>
//             <div className="col-md-6">
//               <label htmlFor="identificationNumber" className="form-label">
//                 كود الموظف
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="identificationNumber"
//                 name="identificationNumber"
//                 value={userData.identificationNumber}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="col-md-6">
//               <label htmlFor="department" className="form-label">
//                 القسم
//               </label>
//               <select
//                 className="form-select"
//                 id="department"
//                 name="department"
//                 value={userData?.department || ""}
//                 onChange={handleChange}
//               >
//                 <option value="">اختر...</option>
//                 <option value="sales">المبيعات</option>
//                 <option value="management">الإدارة</option>
//                 <option value="stores">المخازن</option>
//               </select>
//             </div>
//             <div className="col-md-6">
//               <label htmlFor="dateOfAppointment" className="form-label">
//                 تاريخ التعيين <span className="text-danger">*</span>
//               </label>
//               <input
//                 type="date"
//                 className="form-control"
//                 name="dateOfAppointment"
//                 id="dateOfAppointment"
//                 value={userData.dateOfAppointment}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="col-md-6">
//               <label htmlFor="contractType" className="form-label">
//                 نوع العقد
//               </label>
//               <select
//                 className="form-select"
//                 name="contractType"
//                 id="contractType"
//                 value={userData?.contractType || ""}
//                 onChange={handleChange}
//               >
//                 <option value="">اختر...</option>
//                 <option value="completely">دوام كامل</option>
//                 <option value="partTime">دوام جزئي</option>
//                 <option value="temporary">مؤقت</option>
//               </select>
//             </div>
//             <div className="col-md-6">
//               <label htmlFor="salary" className="form-label">
//                 الراتب <span className="text-danger">*</span>
//               </label>
//               <input
//                 type="number"
//                 className="form-control"
//                 id="salary"
//                 name="salary"
//                 value={userData.salary}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>
//         </div>

//         {/* تفاصيل إضافية */}
//         <div className="card mb-4">
//           <div className="card-header section-header">تفاصيل إضافية</div>
//           <div className="card-body row g-3">
//             <div className="col-md-12">
//               <label className="form-label">تفاصيل إضافية</label>
//               <textarea
//                 className="form-control"
//                 name="details"
//                 value={userData.details}
//                 onChange={handleChange}
//                 rows="3"
//               />
//             </div>
//             <div className="col-md-12">
//               <label className="form-label">صورة الموظف</label>
//               <div
//                 className="image-user dropzone rounded d-flex align-items-center justify-content-center text-center p-4"
//                 onDrop={handleDrop}
//                 onDragOver={handleDragOver}
//                 onClick={() => fileInputRef.current.click()}
//                 style={{
//                   cursor: "pointer",
//                   color: "#1d2939",
//                   minHeight: "150px",
//                 }}
//               >
//                 {image ? (
//                   <img
//                     src={URL.createObjectURL(image)}
//                     alt="Preview"
//                     className="img-thumbnail"
//                     style={{ maxWidth: "70px" }}
//                   />
//                 ) : (
//                   <div>
//                     <UploadFile style={{ fontSize: "40px" }} />
//                     <p className="mt-4">قم بسحب الصورة هنا أو اضغط لاختيار صورة</p>
//                   </div>
//                 )}
//                 <input
//                   type="file"
//                   accept="image/*"
//                   ref={fileInputRef}
//                   onChange={handleImageChange}
//                   style={{ display: "none" }}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </form>
// </div>

//       </div>
//     </div>
//   );
// }
