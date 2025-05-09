import React, { useState, useEffect } from "react";
import Header from "../../../components/Header/Header";
import "./product.css";
import { Link } from "react-router-dom";
import { Add } from "@mui/icons-material";


const Products = () => {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProduct(storedProducts);
    console.log(storedProducts);
  }, []);

  return (
    <div className="container-fluid p-3">
      <div className="product">
        <Header text="ادارة المنتجات" subText="" />

        <div className="produt-table">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="table-title">بيان الأصناف </h5>
            <Link to="/products/create-product" className="btn">
              <Add className="ms-1" />
              إضافة صنف
            </Link>
          </div>

          {/* نموذج البحث */}
          <div className="search-filter mb-4">
            <div className="row">
              <div className="col-md-4">
                <label className="form-label">بحث بالصنف :</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="أدخل اسم الصنف"
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">بحث بالمورد :</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="أدخل اسم المورد"
                />
              </div>

              <div className="col-md-6 mt-4">
                <label className="form-label"> فلتر حسب :</label>
                <div className="d-flex justify-content-between">
                  <select className="form-select ms-2" aria-label="تصنيف">
                    <option value="">التصنيفات</option>
                    <option value="electronics">الكترونيات</option>
                    <option value="clothes">ملابس</option>
                    <option value="accessories">اكسسوارات</option>
                  </select>

                  <select className="form-select ms-2" aria-label="مورد">
                    <option value="">الموردين</option>
                    <option value="supplier1">مورد 1</option>
                    <option value="supplier2">مورد 2</option>
                  </select>

                  <select className="form-select" aria-label="مخزن">
                    <option value="">المخازن</option>
                    <option value="store1">مخزن 1</option>
                    <option value="store2">مخزن 2</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* جدول البيانات */}
          <div className="table-responsive p-0">
            <table className="table table-bordered table-hover w-100 text-center">
              <thead className="table-light">
                <tr>
                  <th>م</th>
                  <th>رقم الصنف</th>
                  <th>اسم الصنف</th>
                  {/* <th>الوصف</th> */}
                  <th>الوحده </th>
                  <th>العلامة التجارية</th>
                  <th>الكمية</th>
                  <th>السعر</th>
                  <th>سعر الشراء</th>
                  <th>التصنيف</th>
                  <th>المورد</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((ele, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{ele.code}</td>
                      <td>{ele.name}</td>
                      <td>{ele.unit}</td>
                      {/* <td className="text-wrap">{ele.description}</td> هنا نضيف text-wrap */}
                      <td>{ele.brand}</td>
                      <td>{ele.stock}</td>
                      <td>{ele.sellingPrice}</td>
                      <td>{ele.purchasePrice}</td>
                      <td>{ele.category}</td>
                      <td>{ele.supplier}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center">
                      لا توجد بيانات لعرضها
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
