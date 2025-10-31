import React from "react";

const Taskbar = ({ windows, onOpen }) => {
  return (
    <div style={{ position: "absolute", bottom: 0, width: "100%", backgroundColor: "#333", color: "#fff", padding: "5px", display: "flex", gap: "5px" }}>
      {windows.map(win => (
        <span key={win.id}>{win.name}</span>
      ))}
      <button onClick={() => onOpen("Network")}>ネットワーク</button>
      <button onClick={() => onOpen("FileSystem")}>ファイル管理</button>
    </div>
  );
};

export default Taskbar;
