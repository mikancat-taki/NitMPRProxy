import React, { useState } from "react";
import Window from "./Window";
import FileExplorer from "./FileExplorer";
import Browser from "./Browser";
import Network from "./Network";
import WASMApp from "./WASMApp";

export default function Desktop() {
  const [windows, setWindows] = useState([]);

  const openWindow = (component) => {
    setWindows([...windows, component]);
  };

  return (
    <div className="desktop">
      <div className="taskbar">
        <button onClick={() => openWindow(<FileExplorer />)}>ファイル</button>
        <button onClick={() => openWindow(<Browser />)}>ブラウザ</button>
        <button onClick={() => openWindow(<Network />)}>ネットワーク</button>
        <button onClick={() => openWindow(<WASMApp />)}>WASMアプリ</button>
      </div>

      {windows.map((win, index) => (
        <Window key={index}>{win}</Window>
      ))}
    </div>
  );
}
