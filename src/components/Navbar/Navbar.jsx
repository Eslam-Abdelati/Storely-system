import React, { useEffect, useState } from "react";
import "./Navbar.css";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { Link } from "react-router-dom";

import {
  AccountCircle,
  Dehaze,
  HighlightOff,
  Logout,
  NotificationsNone,
  PersonOutline,
} from "@mui/icons-material";

export default function Navbar() {
  // const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formatDate = new Intl.DateTimeFormat("ar-EG", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(now);

      // const formatTime = new Intl.DateTimeFormat("ar-EG", {
      //   hour: "2-digit",
      //   minute: "2-digit",

      //   hour12: true,
      // }).format(now);

      setDate(`${formatDate}`);
      // setTime(`${formatTime}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="navbar">
      <div className="container-fluid d-flex justify-content-between align-items-center nav">
        <div className="logo-nav">
          <Dehaze
            className="d-lg-none icon-dash"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasSidebar"
          />
        </div>

        <ul className="navbar-nav d-flex flex-row align-items-center links">

          <li className="nav-item ms-3">
            <div className="cashier">
              <Link className="">
              شاشة الكاشير
              </Link>
            </div>
          </li>

          <li className="nav-item ms-2">
            <div className="date-time">
              
              <span className="date">{date}</span>
            </div>
          </li>

          <li className="nav-item links-list dropdown">
            <div
              className="position-relative"
              role="button"
              data-bs-toggle="dropdown"
            >
              <Link className="nav-link text-white p-0">
                <NotificationsNone className="nav-icon " />
                <span className="number-notfication">3</span>
              </Link>
            </div>

            {/* <ul className="dropdown-menu all-notifications dropdown-menu-start mt-2">
              <li className="all-notifications-header d-flex justify-content-between px-3 py-2">
                <h5 className="title">كل الإشعارات</h5>
              </li>

             
              <li>
                <div className="d-flex justify-content-between notification-data">
                  <div className="d-flex align-items-center">
                    <p className="icon">
                      <HighlightOff className="notification-info-icon" />
                    </p>
                    <p className="notification-info">
                      لا يوجد مخزون في مخزنك حاليا قم باضافة كميه جديده من هذا
                      المنتج
                    </p>
                  </div>
                  <p className="time">مذ 5 دقائق</p>
                </div>
              </li>
              <div className="view-notf">
                <Link className="text-center">مشاهدة كل الإشعارات</Link>
              </div>
            </ul> */}
          </li>

          {/* <li className="nav-item me-2">
            <Link className="nav-link text-white">
              <SettingsRoundedIcon className="nav-icon" />
            </Link>
          </li> */}

          <li className="nav-item me-2 dropdown d-flex align-items-center ">
            <Link
              className="nav-link text-white "
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <AccountCircle className="nav-icon" />
            </Link>
            <p className="mb-0 me-2 text-light">اسلام عمار</p>
            {/* <span className="user-name">Eslam Amaar</span> */}
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" href="#">
                  <PersonOutline sx={{ ml: "7px" }} />
                  <span>الملف الشخصي</span>
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" href="#">
                  <Logout sx={{ ml: "7px" }} />
                  <span>تسجيل الخروج</span>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
