import React, { useState } from "react";
import FileExplorer from "./FileExplorer";
import Browser from "./Browser";
import Window from "./Window";

export default function Desktop() {
  const [windows, setWindows] = useState([]);

  const openApp = (type) => {
    setWindows((prev) => [...prev, { id: Date.now(), type }]);
  };

  const closeWindow = (id) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  };

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#0078d7" }}>
      <div style={{ padding: 10 }}>
        <button onClick={() => openApp("files")}>File Explorer</button>
        <button onClick={() => openApp("browser")}>Browser</button>
      </div>
      {windows.map((w) =>
        w.type === "files" ? (
          <Window key={w.id} title="File Explorer" onClose={() => closeWindow(w.id)}>
            <FileExplorer />
          </Window>
        ) : (
          <Window key={w.id} title="Browser" onClose={() => closeWindow(w.id)}>
            <Browser />
          </Window>
        )
      )}
    </div>
  );
}
