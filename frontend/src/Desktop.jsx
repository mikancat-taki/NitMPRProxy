import React, { useState } from "react";
import Network from "./Network";
import FileSystem from "./FileSystem";
import Taskbar from "./Taskbar";
import AppWindow from "./AppWindow";

const Desktop = () => {
  const [windows, setWindows] = useState([]);

  const openApp = (appName) => {
    setWindows([...windows, { id: Date.now(), name: appName }]);
  };

  const closeApp = (id) => {
    setWindows(windows.filter(win => win.id !== id));
  };

  return (
    <div className="desktop" style={{ width: "100vw", height: "100vh", backgroundColor: "#1e1e1e", color: "#fff" }}>
      <h1>仮想OS</h1>
      <div>
        <button onClick={() => openApp("Network")}>ネットワーク</button>
        <button onClick={() => openApp("FileSystem")}>ファイル管理</button>
      </div>

      {windows.map(win => (
        <AppWindow key={win.id} appName={win.name} onClose={() => closeApp(win.id)}>
          {win.name === "Network" && <Network />}
          {win.name === "FileSystem" && <FileSystem />}
        </AppWindow>
      ))}

      <Taskbar windows={windows} onOpen={openApp} />
    </div>
  );
};

export default Desktop;
