import React, { useState } from "react";

export default function Browser() {
  const [url, setUrl] = useState("https://example.com");
  const [src, setSrc] = useState(url);

  return (
    <div>
      <input value={url} onChange={(e) => setUrl(e.target.value)} style={{ width: "80%" }} />
      <button onClick={() => setSrc(url)}>Go</button>
      <iframe src={src} style={{ width: "100%", height: 300 }} title="Browser"></iframe>
    </div>
  );
}
