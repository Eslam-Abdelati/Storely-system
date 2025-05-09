import React, { useState } from "react";

import "./main.css";

import {
  AttachMoney,
  MoreHoriz,
  ReceiptLong,
  ShoppingCart,
  SignalCellularAlt,
} from "@mui/icons-material";
import Header from "../Header/Header";

export default function Main() {
  const [filters, setFilters] = useState({
    sales: "اليوم",
    purchases: "اليوم",
    orders: "اليوم",
    profit: "اليوم",
    highestSales: "اليوم",
  });

  const [activeRow, setActiveRow] = useState(null);

  const handleRowClick = (index) => {
    setActiveRow(index === activeRow ? null : index);
  };

  const mobileProducts = [
    {
      barcode: "11070100002",
      name: "Samsung Galaxy S23 Ultra",
      price: "ج 47000",
      quantity: 10,
    },
    {
      barcode: "11070100003",
      name: "Xiaomi Redmi Note 12",
      price: "ج 8500",
      quantity: 25,
    },
    {
      barcode: "11070100004",
      name: "Realme C55",
      price: "ج 6200",
      quantity: 30,
    },
    {
      barcode: "11070100005",
      name: "Oppo Reno 10",
      price: "ج 11000",
      quantity: 15,
    },

    {
      barcode: "11070100007",
      name: "Huawei Nova 11",
      price: "ج 14000",
      quantity: 12,
    },
    {
      barcode: "12080100001",
      name: "شاحن سامسونج أصلي 25W",
      price: "ج 350",
      quantity: 50,
    },
    {
      barcode: "12080100002",
      name: "سماعة بلوتوث Xiaomi",
      price: "ج 450",
      quantity: 40,
    },

    {
      barcode: "12080100005",
      name: "شاحن سيارة USB سريع",
      price: "ج 120",
      quantity: 35,
    },
    {
      barcode: "12080100006",
      name: "واقي شاشة زجاجي 6D",
      price: "ج 50",
      quantity: 90,
    },
    {
      barcode: "12080100007",
      name: "كابل Type-C أصلي",
      price: "ج 60",
      quantity: 80,
    },
  ];

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };
  return (
    <div className="main">
      <div className="container-fluid p-3">
        <Header text="أهلا بك " subText="ADMIN" />

        {/* boxs  */}
        <div className="row short-data">
          <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-3">
            <div className="box">
              <div className="header">
                <h6 className="titel text-success">
                  المبيعات <span>| {filters.sales}</span>
                </h6>
                <ul className="dropdown-date">
                  <li
                    className="dropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <MoreHoriz />
                    <ul className="dropdown-menu filter">
                      <li className="dropdown-item">
                        <a onClick={() => handleFilterChange("sales", "اليوم")}>
                          اليوم
                        </a>
                      </li>
                      <li className="dropdown-item">
                        <a
                          onClick={() => handleFilterChange("sales", "الشهري")}
                        >
                          الشهري
                        </a>
                      </li>
                      <li className="dropdown-item">
                        <a
                          onClick={() => handleFilterChange("sales", "السنوي")}
                        >
                          السنوي
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="datils">
                <div className="icon">
                  <SignalCellularAlt style={{ fontSize: "25px" }} />
                </div>
                <div className="number">12500</div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-3">
            <div className="box">
              <div className="header">
                <h6 className="titel text-danger">
                  المشتريات <span>| {filters.purchases}</span>
                </h6>
                <ul className="dropdown-date">
                  <li
                    className="dropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <MoreHoriz />
                    <ul className="dropdown-menu filter">
                      <li className="dropdown-item">
                        <a
                          onClick={() =>
                            handleFilterChange("purchases", "اليوم")
                          }
                        >
                          اليوم
                        </a>
                      </li>
                      <li className="dropdown-item">
                        <a
                          onClick={() =>
                            handleFilterChange("purchases", "الشهري")
                          }
                        >
                          الشهري
                        </a>
                      </li>
                      <li className="dropdown-item">
                        <a
                          onClick={() =>
                            handleFilterChange("purchases", "السنوي")
                          }
                        >
                          السنوي
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="datils">
                <div className="icon bg-danger">
                  <ShoppingCart style={{ fontSize: "20px" }} />
                </div>
                <div className="number">12500</div>
              </div>
            </div>
          </div>

          <div className=" col-lg-3 col-md-3 col-sm-6 col-12 mb-3">
            <div className="box">
              <div className="header">
                <h6 className="titel" style={{ color: "#673ab7" }}>
                  عدد الطلبات <span>| {filters.orders}</span>
                </h6>
                <ul className="dropdown-date">
                  <li
                    className="dropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <MoreHoriz />
                    <ul className="dropdown-menu filter">
                      <li className="dropdown-item">
                        <a
                          onClick={() => handleFilterChange("orders", "اليوم")}
                        >
                          اليوم
                        </a>
                      </li>
                      <li className="dropdown-item">
                        <a
                          onClick={() => handleFilterChange("orders", "الشهري")}
                        >
                          الشهري
                        </a>
                      </li>
                      <li className="dropdown-item">
                        <a
                          onClick={() => handleFilterChange("orders", "السنوي")}
                        >
                          السنوي
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="datils">
                <div className="icon" style={{ backgroundColor: "#673ab7" }}>
                  <ReceiptLong style={{ fontSize: "25px" }} />
                </div>
                <div className="number">0.00</div>
              </div>
            </div>
          </div>

          <div className=" col-lg-3 col-md-3 col-sm-6 col-12 mb-3">
            <div className="box">
              <div className="header">
                <h6 className="titel text-primary">
                  إجمالي الأرباح <span>| {filters.profit}</span>
                </h6>
                <ul className="dropdown-date">
                  <li
                    className="dropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <MoreHoriz />
                    <ul className="dropdown-menu filter">
                      <li className="dropdown-item">
                        <a
                          onClick={() => handleFilterChange("profit", "اليوم")}
                        >
                          اليوم
                        </a>
                      </li>
                      <li className="dropdown-item">
                        <a
                          onClick={() => handleFilterChange("profit", "الشهري")}
                        >
                          الشهري
                        </a>
                      </li>
                      <li className="dropdown-item">
                        <a
                          onClick={() => handleFilterChange("profit", "السنوي")}
                        >
                          السنوي
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="datils">
                <div className="icon bg-primary">
                  <AttachMoney style={{ fontSize: "25px" }} />
                </div>
                <div className="number">0.00</div>
              </div>
            </div>
          </div>
        </div>

        {/* boxs 2  */}
        <div className="row ">
          <div className="col-12 mt-4 mb-4">
            <div className="box best-seller">
              <div className="header mt-2 mb-4">
                <h3 className="titel" style={{ color: "#3f51b5" }}>
                  الأصناف الاكثر مبيعا <span>/ {filters.highestSales}</span>
                </h3>
                <ul className="dropdown-date">
                  <li
                    className="dropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <MoreHoriz />
                    <ul className="dropdown-menu filter">
                      <li className="dropdown-item">
                        <a
                          onClick={() =>
                            handleFilterChange("highestSales", "اليوم")
                          }
                        >
                          اليوم
                        </a>
                      </li>
                      <li className="dropdown-item">
                        <a
                          onClick={() =>
                            handleFilterChange("highestSales", "الشهري")
                          }
                        >
                          الشهري
                        </a>
                      </li>
                      <li className="dropdown-item">
                        <a
                          onClick={() =>
                            handleFilterChange("highestSales", "السنوي")
                          }
                        >
                          السنوي
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="table-responsive">
                <table className="table table-bordered table-hover custom-bordered">
                  <thead className="custom-header">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">الباركود</th>
                      <th scope="col">الصنف</th>
                      <th scope="col"> السعر </th>
                      <th scope="col"> الكمية</th>
                      <th scope="col"> مبيعات </th>
                    </tr>
                  </thead>
                  <tbody className="custom-body">
                    {mobileProducts.map((product, index) => {
                      const unitPrice = parseFloat(
                        product.price.replace(/[^\d.]/g, "")
                      );
                      const totalPrice = unitPrice * product.quantity;

                      return (
                        <tr
                          key={product.barcode}
                          onClick={() => handleRowClick(index)}
                          className={
                            activeRow === index ? "active-row" : "not-active"
                          }
                        >
                          <th scope="row">{index + 1}</th>
                          <td>{product.barcode}</td>
                          <td>{product.name}</td>
                          <td>ج {unitPrice.toLocaleString()}</td>
                          <td>{product.quantity}</td>
                          <td>ج {totalPrice.toLocaleString()}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-12 mt-4 mb-4">
            <div className="box finish-seller">
              <div className="header mt-2 mb-4">
                <h3 className="titel" style={{ color: "#3f51b5" }}>
                  منتجات اوشكت على الانتهاء
                </h3>
              </div>

              <div className="table-responsive">
                <table className="table table-bordered table-hover custom-bordered tabl">
                  <thead className="custom-header ">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">الباركود</th>
                      <th scope="col">الصنف</th>
                      <th scope="col"> الفرع </th>
                      <th scope="col"> الكمية بالمخزن</th>
                    </tr>
                  </thead>
                  <tbody className="custom-body">
                    {mobileProducts.map((product, index) => {
                      return (
                        <tr
                          key={product.barcode}
                          onClick={() => handleRowClick(index)}
                          className={
                            activeRow === index ? "active-row" : "not-active"
                          }
                        >
                          <th scope="row">{index + 1}</th>
                          <td>{product.barcode}</td>
                          <td>{product.name}</td>
                          <td> </td>
                          <td>{product.quantity}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
