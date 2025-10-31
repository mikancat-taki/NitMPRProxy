import React, { useEffect, useRef } from "react";

export default function WASMApp() {
  const canvasRef = useRef(null);

  useEffect(() => {
    (async () => {
      const response = await fetch("/wasm/cpu.wasm");
      const bytes = await response.arrayBuffer();
      const { instance } = await WebAssembly.instantiate(bytes, {});
      // 仮想CPUを初期化
      if (instance.exports.start) instance.exports.start();
    })();
  }, []);

  return <canvas ref={canvasRef} width={400} height={300} style={{ border: "1px solid #fff" }} />;
}
