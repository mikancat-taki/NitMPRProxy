import React from "react";

export default function Browser() {
  return (
    <div className="browser">
      <h3>仮想ブラウザ</h3>
      <iframe
        src="https://example.com"
        style={{ width: "100%", height: "400px", border: "none" }}
        title="仮想ブラウザ"
      />
    </div>
  );
}
