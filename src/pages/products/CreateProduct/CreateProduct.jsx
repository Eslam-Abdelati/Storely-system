import React, { useState } from "react";
import Header from "../../../components/Header/Header";
import "./createProduct.css";
import { Link, useNavigate } from "react-router-dom";
import { AddCircle } from "@mui/icons-material";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import AddCategory from "../../categories/addCategory/AddCategory";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: "", //اسم المنتج
    description: "", //وصف المنتج
    code: "", //كود المنتج
    unit: "", //الوحدة
    purchasePrice: "", //سعر الشراء
    sellingPrice: "", //سعر البيع
    tax: "", //الضريبه
    discountPrice: "", //سعر الخصم
    stock: "", //الكمية
    minimumQuantity: "", //اقل كمية
    supplier: "", //المورد
    brand: "", //العلامة التجارية
    category: "", //التصنيف 
    available: true, //متوفر
    image: null, //صورة المنتج

    details: "", //ملاحظات إضافية
  });

  const [errors, setErrors] = useState("");
  const [show, setShow] = useState(false);

  // [ لتحديث الحالة الخاصة بالمنتج عند إجراء أي تغيير في الحقول داخل النموذج ]
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));

    // [ إزالة الخطأ الحقول الفارغه عند الكتابة في الحقل ]
    if (value.trim() !== "") {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  /* [  التحقق من صحة الحقول المطلوبه والواجب ادخالها ] 
     [ يقوم الكود بالتحقق من أن الحقول الأساسية قد تم تعبئتها بشكل صحيح ]
     [ إذا كانت أي من الحقول فارغة أو تحتوي على بيانات غير صحيحة، يتم إضافة رسالة خطأ إلى كائن newErrors]
   */
  const validateForm = () => {
    const newErrors = {};

    // تعريف الحقول المطلوب التحقق منها
    const fields = [
      { name: "name", label: "اسم المنتج" },
      { name: "description", label: "وصف المنتج" },
      { name: "code", label: "كود المنتج" },
      { name: "unit", label: "الوحدة" },
      { name: "purchasePrice", label: "سعر الشراء" },
      { name: "sellingPrice", label: "سعر البيع" },
      { name: "supplier", label: "المورد " },
      { name: "stock", label: "الكمية" },
      { name: "minimumQuantity", label: "الحد الأدني للكمية" },
      { name: "category", label: "الفئة" },
    ];
    // التحقق من كل حقل
    fields.forEach((field) => {
      if (!productData[field.name]) {
        newErrors[field.name] = `يرجى إدخال ${field.label}`;
      }
    });
    // تحديث حالة الأخطاء
    setErrors(newErrors);
    // إرجاع النتيجة بناءً على وجود الأخطاء
    return Object.keys(newErrors).length === 0;
  };

  // [ الكود الخاص بالحفظ ]
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // اذا كان التحقق سليم يتم تنفيذ هذا الكود
      console.log(productData);
      const existingProducts =
        JSON.parse(localStorage.getItem("products")) || [];
      const newProducts = [...existingProducts, productData];
      localStorage.setItem("products", JSON.stringify(newProducts));

      setProductData({
        name: "", //اسم المنتج
        code: "", //كود المنتج
        unit: "", //الوحدة
        purchasePrice: "", //سعر الشراء
        sellingPrice: "", //سعر البيع
        tax: "", //الضريبه
        discountPrice: "", //سعر الخصم
        stock: "", //الكمية
        minimumQuantity: "", //اقل كمية
        supplier: "", //المورد
        brand: "", //العلامة التجارية
        category: "", //الفئة الفرعية
        available: true, //متوفر
        image: null, //صورة المنتج
        description: "", //وصف المنتج
        details: "", //ملاحظات إضافية
      });
    }
  };
  // [ الكود الخاص بالحفظ والذهاب لصفحة المنتجات]
  const handleSaveAndAdd = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(productData);
      const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
      const newProducts = [...existingProducts, productData];
      localStorage.setItem("products", JSON.stringify(newProducts));
      navigate("/products");
    }
  };
  

  // [  إغلاق المودال عند الإغلاق ]
  const handleClose = () => {
    setShow(false);
  };

  // [ إضافة الفئة الجديدة إلى الحقل category في بيانات المنتج ]
  const handleAddCategory = (newCategory) => {
    setProductData((prev) => ({
      ...prev,
      category: newCategory,
    }));
    setShow(false); // إغلاق المودال بعد إضافة الفئة
  };

  return (
    <div className="add-product">
      <div className="container-fluid p-2 ">
        <Header text="منتج جديد" />

        <form onSubmit={handleSubmit}>
          <div className="form">
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">اسم الصنف </label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  name="name"
                  value={productData.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>

              <div className="col-md-4">
                <label className="form-label">وصف الصنف</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.description ? "is-invalid" : ""
                  }`}
                  name="description"
                  value={productData.description}
                  onChange={handleChange}
                />
                {errors.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
              </div>

              <div className="col-md-4">
                <label className="form-label">كود المنتج</label>
                <input
                  type="text"
                  className={`form-control ${errors.code ? "is-invalid" : ""}`}
                  name="code"
                  value={productData.code}
                  onChange={handleChange}
                  required
                />
                {errors.code && (
                  <div className="invalid-feedback">{errors.code}</div>
                )}
              </div>

              <div className="col-md-4">
                <label className="form-label">الوحدة</label>
                <input
                  type="text"
                  className={`form-control ${errors.unit ? "is-invalid" : ""}`}
                  name="unit"
                  value={productData.unit}
                  onChange={handleChange}
                  required
                />
                {errors.unit && (
                  <div className="invalid-feedback">{errors.unit}</div>
                )}
              </div>

              <div className="col-md-4">
                <label className="form-label">سعر الشراء</label>
                <input
                  type="number"
                  className={`form-control ${
                    errors.purchasePrice ? "is-invalid" : ""
                  }`}
                  name="purchasePrice"
                  value={productData.purchasePrice}
                  onChange={handleChange}
                  required
                />
                {errors.purchasePrice && (
                  <div className="invalid-feedback">{errors.purchasePrice}</div>
                )}
              </div>

              <div className="col-md-4">
                <label className="form-label">سعر البيع</label>
                <input
                  type="number"
                  className={`form-control ${
                    errors.sellingPrice ? "is-invalid" : ""
                  }`}
                  name="sellingPrice"
                  value={productData.sellingPrice}
                  onChange={handleChange}
                  required
                />
                {errors.sellingPrice && (
                  <div className="invalid-feedback">{errors.sellingPrice}</div>
                )}
              </div>

              <div className="col-md-4">
                <label className="form-label">الضريبه</label>
                <input
                  type="number"
                  className="form-control"
                  name="tax"
                  value={productData.tax}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">سعر الخصم (اختياري)</label>
                <input
                  type="number"
                  className="form-control"
                  name="discountPrice"
                  value={productData.discountPrice}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">الكمية :</label>
                <input
                  type="number"
                  className={`form-control ${errors.stock ? "is-invalid" : ""}`}
                  name="stock"
                  value={productData.stock}
                  onChange={handleChange}
                  required
                />
                {errors.stock && (
                  <div className="invalid-feedback">{errors.stock}</div>
                )}
              </div>

              <div className="col-md-4">
                <label className="form-label">الحد الأدنى للكمية: :</label>
                <input
                  type="number"
                  className={`form-control ${
                    errors.minimumQuantity ? "is-invalid" : ""
                  }`}
                  name="minimumQuantity"
                  value={productData.minimumQuantity}
                  onChange={handleChange}
                  required
                />
                {errors.minimumQuantity && (
                  <div className="invalid-feedback">
                    {errors.minimumQuantity}
                  </div>
                )}
              </div>

              <div className="col-md-4">
                <label className="form-label">العلامة التجارية :</label>
                <input
                  type="text"
                  className="form-control "
                  name="brand"
                  value={productData.brand}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label"> المورد</label>
                <input
                  type="text"
                  className={`form-select ${
                    errors.supplier ? "is-invalid" : ""
                  }`}
                  name="supplier"
                  value={productData.supplier}
                  onChange={handleChange}
                />
                {errors.supplier && (
                    <div className="invalid-feedback">{errors.supplier}</div>
                  )}
              </div>

              <div className="col-md-4">
                <label className="form-label">التصنيف :</label>
                <div className="input-group">
                  <select
                    className={`form-select ${
                      errors.category ? "is-invalid" : ""
                    }`}
                    name="category"
                    value={productData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">اختر الفئة</option>
                    <option value="electronics">الكترونيات</option>
                    <option value="clothes">ملابس</option>
                    <option value="accessories">اكسسوارات</option>
                  </select>

                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip>إضافة فئة جديدة</Tooltip>}
                    delay={{ show: 800, hide: 100 }}
                  >
                    <button
                      type="button"
                      className="btn add"
                      onClick={() => setShow(true)} // فتح المودال عند الضغط
                    >
                      <AddCircle className="icon-add" />
                    </button>
                  </OverlayTrigger>
                  {errors.category && (
                    <div className="invalid-feedback">{errors.category}</div>
                  )}
                </div>
              </div>

              <div className="col-md-4">
                <label className="form-label">صورة المنتج</label>
                <input
                  type="file"
                  className="form-control"
                  name="image"
                  onChange={handleChange}
                  accept="image/*"
                />
              </div>

              <div className="col-md-4 d-flex align-items-center">
                <div className="form-check mt-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="available"
                    checked={productData.available}
                    onChange={handleChange}
                    id="available"
                  />
                  <label className="form-check-label" htmlFor="available">
                    متوفر
                  </label>
                </div>
              </div>

              <div className="col-12">
                <label className="form-label">تفاصيل إضافية</label>
                <textarea
                  className="form-control"
                  name="details"
                  value={productData.details}
                  onChange={handleChange}
                  rows="5"
                />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <button
              type="button"
              className="btn btn-primary ms-3"
              onClick={handleSaveAndAdd}
            >
              حفظ
            </button>
            <button type="submit" className="btn btn-primary ">
              حفظ واضافة منتج اخر
            </button>
          </div>
        </form>
      </div>

      <AddCategory
        show={show}
        handleClose={handleClose}
        handleAddCategory={handleAddCategory}
      />
    </div>
  );
};

export default CreateProduct;
