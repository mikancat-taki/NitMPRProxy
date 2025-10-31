import React, { useState } from "react";
import Window from "./Window";
import FileExplorer from "./FileExplorer";
import Browser from "./Browser";
import Network from "./Network";
import WASMApp from "./WASMApp";

export default function Desktop() {
  const [windows, setWindows] = useState([]);

  const openApp = (type) => {
    setWindows(prev => [...prev, { id: Date.now(), type }]);
  };

  const closeWindow = (id) => setWindows(prev => prev.filter(w => w.id !== id));

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#111" }}>
      <div style={{ padding: 10 }}>
        <button onClick={() => openApp("files")}>File Explorer</button>
        <button onClick={() => openApp("browser")}>Browser</button>
        <button onClick={() => openApp("network")}>Network</button>
        <button onClick={() => openApp("wasm")}>WASM App</button>
      </div>
      {windows.map(w => {
        let content;
        if (w.type === "files") content = <FileExplorer />;
        if (w.type === "browser") content = <Browser />;
        if (w.type === "network") content = <Network />;
        if (w.type === "wasm") content = <WASMApp />;
        return <Window key={w.id} title={w.type} onClose={() => closeWindow(w.id)}>{content}</Window>
      })}
    </div>
  );
}
