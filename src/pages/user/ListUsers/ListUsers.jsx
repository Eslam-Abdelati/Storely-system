import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./listUsers.css";
import { Add, Edit, Print } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-regular-svg-icons/faFilePdf";
import { faCopy, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import Creat from "../AddUser/AddUser";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loading from "../../../components/Loading/Loading";
import Button from "../../../components/But/Button";

export default function ListUsers() {
  const navigate = useNavigate();

  /* 
  1- [ users ] مصفوفة تحتوي على قائمة الموظفين
  2- [ selectedUsers ] مصفوفة تحتوي على المعرفات (IDs) للموظفين الذين تم تحديدهم.
  3- [ show ] يتحكم في ظهور نافذة إضافة/تعديل الموظف.
  4- [ filterType ] تستخدم لتصفية الموظفين بناءً على نوعهم (جميع الموظفين، مدير، بائع).
  5-  [ isEdit ] تحديد ما إذا كان المستخدم في وضع التعديل أم الإضافة.
  6- [ editingUser ]يحتوي على بيانات الموظف الذي يتم تعديله.
  7-  [ searchTerm ] للكشف عن الموظفين بناءً على بحث نصي.
  */
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [isEdit, setIsEdit] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRowClick = (e, id) => {
    // تجاهل الضغط إن كان من داخل checkbox
    if (e.target.type === "checkbox") return;
    setSelectedUsers([id]);
  };

  const allUsers = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(users);
    return users;
  };

  useEffect(() => {
    allUsers();
  }, []);

  const handleCheckboxChange = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers((prev) => prev.filter((userId) => userId !== id));
    } else {
      setSelectedUsers((prev) => [...prev, id]);
    }
  };

  const handleAddUser = (newUser) => {
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    toast.success("تم إضافة موظف جديد بنجاح", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
    });

    // تأكد من تعيين isEdit إلى false عند إضافة موظف جديد
    setIsEdit(false);
    setEditingUser(null); // تأكد من أن لا يوجد موظف في وضع التعديل
  };

  const handelFilter = (e) => {
    e.preventDefault();
    setIsLoading(true); // بدء اللودينج

    setTimeout(() => {
      const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
      if (filterType === "all") {
        setUsers(savedUsers);
      } else {
        const filtered = savedUsers.filter(
          (user) => user.userType === filterType
        );
        setUsers(filtered);
      }
      setIsLoading(false); // إنهاء اللودينج
    }, 500); // تأخير بسيط لمحاكاة تحميل البيانات
  };

  const handleEditUser = () => {
    if (selectedUsers.length !== 1) {
      Swal.fire({
        title: "يرجى تحديد موظف واحد فقط للتعديل",
        confirmButtonText: "موافق",
        confirmButtonColor: "#d33",
      });
      return;
    }
    const selected = users.find((user) => user.id === selectedUsers[0]);
    setEditingUser(selected);
    setIsEdit(true);
    setShow(true);
  };

  const handleUpdateUser = (userUpdated) => {
    const updatedUsers = users.map((user) =>
      user.id === userUpdated.id ? userUpdated : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setIsEdit(false);
    setEditingUser(null);
    setSelectedUsers([]);
    toast.success(
      `تم تعديل بيانات الموظف: ${userUpdated.firstName} ${userUpdated.lastName} بنجاح`,
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
      }
    );
  };

  const handleViewDetails = () => {
    if (selectedUsers.length !== 1) {
      Swal.fire({
        title: "يرجى تحديد موظف واحد فقط لعرض التفاصيل",
        confirmButtonText: "موافق",
        confirmButtonColor: "#d33",
      });
      return;
    }

    const selectedId = selectedUsers[0];
    navigate(`/users/user/${selectedId}`);
  };

  // const handleDeleteSelected = (id) => {
  //   const existingData = JSON.parse(localStorage.getItem("users")) || [];
  //   const updatedData = existingData.filter((user) => user.id !== id);
  //   localStorage.setItem("users", JSON.stringify(updatedData));

  //   allUsers();
  // };

  const handleDeleteSelected = () => {
    if (selectedUsers.length === 0) {
      Swal.fire({
        title: "يرجى تحديد موظف واحد على الأقل للحذف",
        confirmButtonText: "موافق",
        confirmButtonColor: "#d33",
      });
      return;
    }

    Swal.fire({
      title: "هل أنت متأكد من حذف الاشخاص المحددين ؟",
      text: "لن تتمكن من التراجع عن هذا الإجراء!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "حذف",
      cancelButtonText: "إلغاء",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedUsers = users.filter((user) => {
          // console.log(selectedUsers.includes(user.id));
          return !selectedUsers.includes(user.id);
        });
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        setSelectedUsers([]);
        toast.success(`تم حذف ${selectedUsers.length} موظف بنجاح`, {
          position: "top-center",
          autoClose: 3000,
        });
      }
    });
  };

  const filteredUsers = users.filter((user) => {
    const search = searchTerm.toLowerCase();
    return (
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search) ||
      user.phoneNumber.includes(search)
    );
  });

  return (
    <div className="list-user">
      <div className="container-fluid p-3">
        <Header text="جميع الموظفين " subText="إدارة الوظفين" />
      </div>

      <ToastContainer />

      <Creat
        show={show}
        setShow={setShow}
        onAddUser={handleAddUser}
        onUpdateUser={handleUpdateUser}
        isEdit={isEdit}
        editingUser={editingUser}
        users={users}
      />

      <div className="container-fluid users-page-content">
        <div className="list-user-content">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="table-title"> قائمة الموظفين</h5>
            {/* <button
              className="btn btn-add"
              onClick={() => {
                setIsEdit(false); // تعيين isEdit إلى false
                setEditingUser(null); // تعيين editingUser إلى null
                setShow(true); // فتح نافذة إضافة الموظف
              }}
            >
              <Add className="ms-1" />
              موظف جديد
            </button> */}

            <Button
              text="موظف جديد"
              icon={<Add />}
              className="btn-add"
              onClick={() => {
                setIsEdit(false);
                setEditingUser(null);
                setShow(true);
              }}
            />
          </div>

          <div className="row tabel-header d-flex align-items-center justify-content-between">
            <div className="col-md-12 col-sm-12 col-12 d-flex align-items-center box-search mb-2">
              <form className="filter-employee">
                <select
                  className="filter-employee-table ms-4"
                  id="employee"
                  name="employee"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  required
                >
                  <option value="all">كل الموظفين</option>
                  <option value="superadmin">مدير</option>
                  <option value="employee">بائع</option>
                </select>
                <Button text="عرض " className="view" onClick={handelFilter} />
              </form>
            </div>
          </div>

          <div className="d-flex flex-wrap justify-content-start mb-2 mt-3 action">
            <Button
              text="تعديل "
              icon={<Edit />}
              className="btn action-item"
              onClick={handleEditUser}
            />
            <Button
              text="التفاصيل "
              icon={<FontAwesomeIcon icon={faCopy} className="ms-2" />}
              className="btn action-item"
              onClick={handleViewDetails}
            />
            <Button
              text="حذف "
              icon={<FontAwesomeIcon icon={faTrashAlt} className="ms-2" />}
              className="btn action-item"
              onClick={handleDeleteSelected}
            />
            <Button
              text="طباعة "
              icon={ <Print className="ms-2" />}
              className="btn action-item"
             
            />
            <Button
              text="PDF "
              icon={ <FontAwesomeIcon icon={faFilePdf} className="ms-2" />}
              className="btn action-item"
             
            />
        
            <input
              type="search"
              className="user-search"
              id="searchEmpploy"
              placeholder="بحث ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {isLoading ? (
            <Loading />
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        checked={
                          filteredUsers.length > 0 &&
                          filteredUsers.every((user) =>
                            selectedUsers.includes(user.id)
                          )
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            const allIds = filteredUsers.map((user) => user.id);
                            setSelectedUsers(allIds);
                          } else {
                            setSelectedUsers([]);
                          }
                        }}
                      />
                    </th>
                    <th>كود الموظف </th>
                    <th>اسم الموظف</th>
                    <th>البريد الإلكتروني</th>
                    <th>الهاتف</th>
                    <th>الوظيفة</th>
                    <th>الراتب</th>
                    <th>اجمالي السلفة</th>
                    {/* <th>اكشن </th> */}
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => (
                      <tr
                        key={index}
                        className={
                          selectedUsers.includes(user.id)
                            ? "active-row"
                            : "not-active"
                        }
                        onClick={(e) => handleRowClick(e, user.id)} // تعديل هنا
                      >
                        <th>
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={(e) => {
                              e.stopPropagation(); // لمنع تفعيل tr عند الضغط على checkbox
                              handleCheckboxChange(user.id);
                            }}
                          />
                        </th>
                        <td>{user.identificationNumber}</td>
                        <td>
                          {user.firstName} {user.lastName}
                        </td>
                        <td>{user.email}</td>
                        <td>{user.phoneNumber}</td>
                        <td>{user.userType}</td>
                        <td>{parseFloat(user.salary || 0).toFixed(2)} </td>
                        <td>{parseFloat(user.totalLoan || 0).toFixed(2)}</td>

                        {/* <td>
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // منع تنفيذ tr عند الضغط على زر الحذف
                              handleDeleteSelected(user.id);
                            }}
                          >
                            حذف
                          </button>
                        </td> */}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center">
                        لا توجد بيانات ...
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <td
                      colSpan="2"
                      className="text-end fw-bold bg-primary-subtle"
                    >
                      عدد
                    </td>
                    <td className="fw-bold bg-primary-subtle">
                      {filteredUsers.length}
                    </td>
                    <td
                      colSpan="3"
                      className="text-end fw-bold bg-primary-subtle"
                    >
                      الإجمالي:
                    </td>
                    <td className="fw-bold bg-primary-subtle">
                      {filteredUsers
                        .reduce(
                          (acc, user) => acc + Number(user.salary || 0.0),
                          0.0
                        )
                        .toFixed(2)}{" "}
                      جنيه
                    </td>
                    <td colSpan="2" className="fw-bold bg-primary-subtle">
                      {filteredUsers
                        .reduce(
                          (acc, user) => acc + Number(user.totalLoan || 0.0),
                          0.0
                        )
                        .toFixed(2)}{" "}
                      جنيه
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
