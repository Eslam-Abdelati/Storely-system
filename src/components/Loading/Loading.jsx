import React from "react";
import "./Loading.css"

export default function Loading() {
  return (
    <div className="spinner-container-submit">
      <div className="spinner">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
