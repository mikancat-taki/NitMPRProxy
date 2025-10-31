import React from "react";

const AppWindow = ({ appName, children, onClose }) => {
  return (
    <div style={{ position: "absolute", top: "50px", left: "50px", width: "300px", height: "200px", backgroundColor: "#222", border: "1px solid #555", color: "#fff", padding: "5px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <strong>{appName}</strong>
        <button onClick={onClose}>×</button>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default AppWindow;
