import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./sidebar.css";
import {
  Add,
  ExitToApp,
  ExpandLess,
  ExpandMore,
  GridView,
  LocalMall,
  ManageAccounts,
  PersonOutline,
  Store,
} from "@mui/icons-material";

const SidebarMenu = ({ openMenus, toggleMenu, isMobile }) => {
  const location = useLocation();
  const navigate = useNavigate();  // استخدم useNavigate هنا

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path);

  const dismissAttr = isMobile ? { "data-bs-dismiss": "offcanvas" } : {};

  // وظيفة لإغلاق السايدبار والتوجيه باستخدام React Router
  const handleLinkClick = (to) => {
    if (isMobile) {
      // إضافة تأخير صغير لإغلاق السايدبار بشكل صحيح
      setTimeout(() => {
        navigate(to);  // استخدم navigate بدلاً من window.location.href
      }, 300); // تأخير 300 ميلي ثانية
    } else {
      navigate(to);  // استخدم navigate مباشرة إذا كان السايدبار في وضع غير موبايل
    }
  };

  return (
    <ul className="nav flex-column">
      <li className="logo-nav sidbar-logo">
        <Link className="navbar-brand logo-name" to="/">
          GP-System
        </Link>
        <span className="version">V0.0.1</span>
      </li>

      {/* الرئيسية */}
      <li className="nav-item">
        <Link
          to="/"
          className={`nav-link sidebar-link ${location.pathname === "/" ? "active" : ""}`}
          {...dismissAttr}
          onClick={() => handleLinkClick("/")}
        >
          <GridView className="icon" />
          <span className="name">الرئيسية</span>
        </Link>
      </li>

      {/* المنتجات */}
      <li className="nav-item">
        <button
          className={`nav-link sidebar-link btn-toggle d-flex align-items-center ${isActive("/products") ? "active" : ""}`}
          onClick={() => toggleMenu("products")}
        >
          <Store className="icon" />
          <span className="name">المنتجات</span>
          <span className="me-auto">
            {openMenus.products ? <ExpandLess /> : <ExpandMore />}
          </span>
        </button>
        {openMenus.products && (
          <ul className="nav flex-column sidebar-sub">
            <li className="nav-item">
              <Link
                to="/products"
                className={`nav-link sidebar-sub-link ${location.pathname === "/products" ? "active" : ""}`}
                {...dismissAttr}
                onClick={() => handleLinkClick("/products")}
              >
                <LocalMall className="icon" />
                <span className="name">جميع المنتجات</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/products/create-product"
                className={`nav-link sidebar-sub-link ${location.pathname === "/products/create-product" ? "active" : ""}`}
                {...dismissAttr}
                onClick={() => handleLinkClick("/products/create-product")}
              >
                <Add className="icon" />
                <span className="name">إضافة منتج جديد</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/products/category"
                className={`nav-link sidebar-sub-link ${location.pathname === "/products/category" ? "active" : ""}`}
                {...dismissAttr}
                onClick={() => handleLinkClick("/products/category")}
              >
                <Add className="icon" />
                <span className="name"> الأقسام الداخلية </span>
              </Link>
            </li>
          </ul>
        )}
      </li>

      {/* الموظفين */}
      <li className="nav-item">
        <button
          className={`nav-link sidebar-link btn-toggle d-flex align-items-center ${isActive("/users") ? "active" : ""}`}
          onClick={() => toggleMenu("employee")}
        >
          <ManageAccounts className="icon" />
          <span className="name">الموظفين والرواتب</span>
          <span className="me-auto">
            {openMenus.employee ? <ExpandLess /> : <ExpandMore />}
          </span>
        </button>
        {openMenus.employee && (
          <ul className="nav flex-column sidebar-sub">
            <li className="nav-item">
              <Link
                to="/users"
                className={`nav-link sidebar-sub-link ${location.pathname === "/users" ? "active" : ""}`}
                {...dismissAttr}
                onClick={() => handleLinkClick("/users")}
              >
                <PersonOutline className="icon" />
                <span className="name">قائمة الموظفين</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/users/pay-sallery"
                className={`nav-link sidebar-sub-link ${location.pathname === "/users/salaries" ? "active" : ""}`}
                {...dismissAttr}
                onClick={() => handleLinkClick("/users/pay-sallery")}
              >
                <Add className="icon" />
                <span className="name">صرف المرتبات</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/users/pay-money-out"
                className={`nav-link sidebar-sub-link ${location.pathname === "/users/pay-money-out" ? "active" : ""}`}
                {...dismissAttr}
                onClick={() => handleLinkClick("/users/pay-money-out")}
              >
                <Add className="icon" />
                <span className="name">تسجيل سلف وحوافز وخصومات</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/users/Payroll-items"
                className={`nav-link sidebar-sub-link ${location.pathname === "/users/Payroll-items" ? "active" : ""}`}
                {...dismissAttr}
                onClick={() => handleLinkClick("/users/Payroll-items")}
              >
                <Add className="icon" />
                <span className="name">بنود الرواتب</span>
              </Link>
            </li>
          </ul>
        )}
      </li>

      {/* تسجيل خروج */}
      <li className="nav-item">
        <Link
          to="/logout"
          className="nav-link sidebar-link"
          {...dismissAttr}
          onClick={() => handleLinkClick("/logout")}
        >
          <ExitToApp className="icon" />
          <span className="name">تسجيل خروج</span>
        </Link>
      </li>
    </ul>
  );
};

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menuName) => {
    setOpenMenus((prevState) => ({
      ...prevState,
      [menuName]: !prevState[menuName],
    }));
  };

  return (
    <>
      {/* Sidebar الأساسي للشاشات الكبيرة */}
      <div className="d-flex flex-column d-none d-lg-block">
        <SidebarMenu openMenus={openMenus} toggleMenu={toggleMenu} isMobile={false} />
      </div>

      {/* Sidebar كـ offcanvas في الشاشات الصغيرة */}
      <div
        className="offcanvas offcanvas-end d-lg-none"
        tabIndex="-1"
        id="offcanvasSidebar"
      >
        <div className="offcanvas-body">
          <SidebarMenu openMenus={openMenus} toggleMenu={toggleMenu} isMobile={true} />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
