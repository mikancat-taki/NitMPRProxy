import React from "react";

export default function Window({ title, children, onClose }) {
  return (
    <div style={{
      position: "absolute",
      top: 100,
      left: 100,
      width: 600,
      height: 400,
      background: "white",
      border: "2px solid #000",
      borderRadius: 5,
      padding: 10,
      overflow: "auto",
      zIndex: 10
    }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <b>{title}</b>
        <button onClick={onClose}>X</button>
      </div>
      <div>{children}</div>
    </div>
  );
}
