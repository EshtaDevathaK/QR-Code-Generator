import { useSearchParams } from "react-router-dom";

export default function Display() {
  const [searchParams] = useSearchParams();
  const message = searchParams.get("msg");

  
  return (
    <div style={{ textAlign: "center", padding: "4rem" }}>
      <h1>🎉 You Scanned a QR Code!</h1>
      <p style={{ fontSize: "1.5rem", marginTop: "2rem" }}>
        Message: <span style={{ color: "green" }}>{message}</span>
      </p>
    </div>
  );
}
