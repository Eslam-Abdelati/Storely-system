import React from "react";
import "./button.css"

export default function Button({
  text,
  icon,
  onClick,
  className = "",
  ...props
}) {
  return (
    <button
      onClick={onClick}
      className={`btn button d-flex align-items-center ${className}`}
      {...props}
    >
      {icon && <span className="me-2">{icon}</span>}
      {text}
    </button>
  );
}
