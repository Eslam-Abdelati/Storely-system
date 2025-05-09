import React, { Suspense, useEffect, useState } from "react";
import "./home.css";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 600); // مدة ظهور اللودنج - ممكن تغيرها

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <div className="home">
      <div className="navbar col-12">
        <Navbar />
      </div>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="content">
        {loading ? (
          <Loading />
        ) : (
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        )}
      </div>
    </div>
  );
}
