import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddCategory = ({ show, handleClose, handleAddCategory }) => {
  // [الفورم وحفظ الفئه في  state]
  const [categories, setCategories] = useState({
    name: "",
    sectionCode: "",
    description: "",
  });

  // [ حفظ التغيرات في الحقول]
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategories((prev) => ({ ...prev, [name]: value }));
  };
  // [ عند الحفظ تحفظ البيانات مع اللوجيك المطلوب]
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("category >>>", categories);
    handleAddCategory(categories.name); // إرسال الفئة الجديدة إلى المكون الأب
  };
  return (
    <Modal show={show} onHide={handleClose} centered dir="rtl">
      <Modal.Header closeButton>
        <Modal.Title>إضافة فئة جديدة</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="mb-3">
            <label>اسم الفئة</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={categories.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>رمز الفئة</label>
            <input
              type="text"
              className="form-control"
              name="sectionCode"
              value={categories.sectionCode}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>الوصف</label>
            <textarea
              className="form-control"
              name="description"
              rows="3"
              value={categories.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClose}
          >
            إغلاق
          </button>
          <button type="submit" className="btn btn-primary">
            حفظ
          </button>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </form>
    </Modal>
  );
};

export default AddCategory;
