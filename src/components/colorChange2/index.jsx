import { useState } from "react";

export default function RandomColor() {
  const [typeOfColor, setTypeOfColor] = useState("hex");
  const [color, setColor] = useState("#000000");

  function randomColorUtility(length) {
    return Math.floor(Math.random() * length);
  }

  function handleCreateRandomHexColor() {
    const hex = [1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    let hexColor = "#";
    for (let i = 0; i < 6; i++) {
      hexColor += hex[randomColorUtility(hex.length)];
    }
    setColor(hexColor);
  }

  function handleCreateRandomRgbColor() {
    const r = randomColorUtility(256);
    const g = randomColorUtility(256);
    const b = randomColorUtility(256);
    setColor(`rgb(${r}, ${g}, ${b})`);
  }

  function handleSetTypeToHex() {
    setTypeOfColor("hex");
    handleCreateRandomHexColor(); // manually call hex function
  }

  function handleSetTypeToRgb() {
    setTypeOfColor("rgb");
    handleCreateRandomRgbColor(); // manually call rgb function
  }

  function handleGenerateColor() {
    if (typeOfColor === "hex") {
      handleCreateRandomHexColor();
    } else {
      handleCreateRandomRgbColor();
    }
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: color,
      }}
    >
      <button onClick={handleSetTypeToHex}>Create HEX Color</button>
      <button onClick={handleSetTypeToRgb}>Create RGB Color</button>
      <button onClick={handleGenerateColor}>Generate Random Color</button>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          color: "white",
          fontSize: "60px",
          gap: "20px",
          marginTop: "50px",
        }}
      >
        <h3>{typeOfColor === "rgb" ? "RGB Color" : "HEX Color"}</h3>
        <h1>{color}</h1>
      </div>
    </div>
  );
}
