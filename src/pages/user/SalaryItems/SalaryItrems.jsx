import React, { useEffect, useState } from "react";
import "./salaryItems.css";
import Swal from "sweetalert2";
import { Modal, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../../components/Header/Header";
import Loading from "../../../components/Loading/Loading";

const defaultForm = { nameItem: "", itemEffect: "" };
const effectOptions = ["خصم من الراتب", "سلفة علي الراتب", "حوافز علي الراتب"];

export default function PayrollItems() {
  const [form, setForm] = useState(defaultForm);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("salaryItems");
    if (saved) setItems(JSON.parse(saved));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const isDuplicate = items.some(
      (item) =>
        item.nameItem.trim().toLowerCase() ===
          form.nameItem.trim().toLowerCase() && item.id !== editId
    );

    if (isDuplicate) {
      setError("هذا الاسم مستخدم بالفعل.");
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      let updated;
      if (editId) {
        updated = items.map((item) =>
          item.id === editId ? { ...item, ...form } : item
        );
      } else {
        const newItem = {
          id: items.length > 0 ? items[items.length - 1].id + 1 : 1,
          ...form,
        };
        updated = [...items, newItem];
      }

      setItems(updated);
      localStorage.setItem("salaryItems", JSON.stringify(updated));
      toast.success(`${editId ? "تم تعديل" : "تم إضافة"} البند بنجاح`, {
        position: "top-center",
        autoClose: 3000,
      });

      resetForm();
      setIsLoading(false);
    }, 1000); // محاكاة تأخير العملية
  };

  const resetForm = () => {
    setForm(defaultForm);
    setEditId(null);
    setShowModal(false);
    setError("");
  };

  const handleEdit = (item) => {
    setForm({ nameItem: item.nameItem, itemEffect: item.itemEffect });
    setEditId(item.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "لن تتمكن من التراجع!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "حذف",
      cancelButtonText: "إلغاء",
    }).then((result) => {
      if (result.isConfirmed) {
        const filtered = items.filter((item) => item.id !== id);
        setItems(filtered);
        localStorage.setItem("salaryItems", JSON.stringify(filtered));
        toast.success(`تم حذف البند بنجاح`, {
          position: "top-center",
          autoClose: 3000,
        });
      }
    });
  };

  const SalaryForm = ({ isModal = false }) => (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>اسم البند:</label>
        <input
          className="form-control"
          name="nameItem"
          value={form.nameItem}
          onChange={handleChange}
          required
        />
        {error && <div className="text-danger">{error}</div>}
      </div>

      <label className="mb-2">تأثير البند:</label>
      {effectOptions.map((label, i) => (
        <div key={i} className="form-check mb-2">
          <input
            type="radio"
            id={`effect${i}${isModal ? "Modal" : ""}`}
            name="itemEffect"
            value={label}
            checked={form.itemEffect === label}
            onChange={handleChange}
            className="form-check-input ms-2"
            required
          />
          <label
            htmlFor={`effect${i}${isModal ? "Modal" : ""}`}
            className="form-check-label"
          >
            {label}
          </label>
        </div>
      ))}

      <div className="mt-4">
        {isModal ? (
          <>
            <Button variant="secondary" onClick={resetForm}>
              إغلاق
            </Button>
            <Button type="submit" variant="primary" className="ms-2">
              تعديل
            </Button>
          </>
        ) : (
          <button type="submit" className="btn btn-primary save">
            حفظ
          </button>
        )}
      </div>
    </form>
  );

  return (
    <div className="salary-items">
      <ToastContainer />

      {isLoading && <Loading />}

      <Modal show={showModal} onHide={resetForm} centered dir="rtl">
        <Modal.Header closeButton>
          <Modal.Title>تعديل بند</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SalaryForm isModal />
        </Modal.Body>
      </Modal>

      <div className="container-fluid p-3">
        <Header text="بنود الرواتب" />

        <div className="salary-items-content">
          <h5 className="table-title mb-4">إضافة بند جديد</h5>

          <div className="col-md-6 col-lg-5">{!editId && <SalaryForm />}</div>

          <div className="table-responsive mt-4">
            <table className="table table-bordered table-hover text-center">
              <thead className="custom-header">
                <tr>
                  <th>#</th>
                  <th>اسم البند</th>
                  <th>تأثير البند</th>
                  <th>العمليات</th>
                </tr>
              </thead>
              <tbody className="custom-body">
                {items.length ? (
                  items.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.nameItem}</td>
                      <td>{item.itemEffect}</td>
                      <td>
                        <button
                          className="btn edit ms-2"
                          onClick={() => handleEdit(item)}
                        >
                          تعديل
                        </button>
                        <button
                          className="btn delet"
                          onClick={() => handleDelete(item.id)}
                        >
                          حذف
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">لا توجد بنود بعد.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
