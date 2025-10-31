import React from "react";

export default function Window({ children }) {
  return (
    <div className="window">
      <div className="window-header">ウィンドウ</div>
      <div className="window-content">{children}</div>
    </div>
  );
}
