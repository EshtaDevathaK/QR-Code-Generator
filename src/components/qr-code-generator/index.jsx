import { useState } from "react";
import QRCode from "react-qr-code";


export default function QRCodeGenerator() {
  // 🧠 MEMORY SLOT: Hold the final URL to convert into QR
  const [qrCode, setQrCode] = useState("");

  // 🎯 TRACK USER INPUT: This updates as the user types their message
  const [input, setInput] = useState("");

  // 🚀 LAUNCH THE GENERATION SEQUENCE when button is clicked
  function handleGenerateQrCode() {
    // 🔐 ENCODE THE MESSAGE SAFELY for use in a URL (handles ?, &, spaces, etc.)
    const encoded = encodeURIComponent(input);

    // 🌐 BUILD THE FULL URL that the QR will point to
    const fullUrl = `${window.location.origin}/display?msg=${encoded}`;

    // 💾 STORE THE RESULT so QR code can render it
    setQrCode(fullUrl);

    // 🧹 RESET THE INPUT FIELD for UX cleanliness
    setInput('');
  }

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>🚧 QR Code Generator Portal</h1>

      {/* 🧊 TEXT INPUT ZONE: Where user types their message */}
      <input
        type="text"
        value={input}
        placeholder="Enter your message"
        onChange={(e) => setInput(e.target.value)} // 🔁 TRACK CHANGES LIVE
        style={{ padding: "10px", width: "300px", marginRight: "10px" }}
      />

      {/* 🔘 ACTION BUTTON: Triggers the QR generation */}
      <button
        onClick={handleGenerateQrCode}           // 🚀 Launch the generation logic
        disabled={!input.trim()}                 // 🔒 Disable if input is empty
        style={{ padding: "10px 20px" }}
      >
        Generate
      </button>

      {/* 📦 CONDITIONAL ZONE: Only render QR after it's ready */}
      {qrCode && (
        <div style={{ marginTop: "2rem" }}>
          {/* 🧾 QR VISUALIZER: Renders a scannable image of the full URL */}
          <QRCode value={qrCode} size={256} />

          {/* 🔍 INSTRUCTIONAL MESSAGE */}
          <p>📱 Scan this QR to view your message!</p>
        </div>
      )}
    </div>
  );
}

// | Comment Type      | Example                                | Purpose                            |
// | ----------------- | -------------------------------------- | ---------------------------------- |
// | **Brain command** | `// 🚀 LAUNCH THE GENERATION SEQUENCE` | Feels like an action in your brain |
// | **Emojis**        | `// 🧠 MEMORY SLOT`                    | Visually marks the purpose quickly |
// | **Logic-focused** | `// 🌐 BUILD THE FULL URL`             | Connects intention to code         |
// | **UX-focused**    | `// 🧹 RESET THE INPUT FIELD`          | Makes you think about experience   |
// | **Flow markers**  | `// 🔘 ACTION BUTTON`                  | Shows what triggers what           |
