import React from "react";

export default function Window({ title, children, onClose }) {
  return (
    <div style={{
      position: "absolute",
      top: 50,
      left: 50,
      width: 400,
      background: "#222",
      border: "1px solid #fff",
      padding: 5,
      color: "#fff"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{title}</span>
        <button onClick={onClose}>X</button>
      </div>
      <div>{children}</div>
    </div>
  );
}
