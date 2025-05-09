import React from "react";
import "./login.css";

export default function Login() {
  return (
    <>
      <div className="login">
        
        
          <div className="card p-5 title">
          <h3 className="text-center">تسجيل الدخول</h3>
         
            <div className="mt-5 p-4" style={{ width: "350px" }}>
              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    required
                    autoComplete="username"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    كلمة المرور
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    required
                    autoComplete="current-password"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  دخول
                </button>
              </form>
            </div>
          </div>
        </div>
    
    </>
  );
}
