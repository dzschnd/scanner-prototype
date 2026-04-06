import { useState } from "react";

type Props = {
  onSubmit: (value: string) => void;
};

export default function DebugPanel({ onSubmit }: Props) {
  const [debugInput, setDebugInput] = useState("");

  const handleSubmit = () => {
    if (!debugInput.trim()) return;
    onSubmit(debugInput.trim());
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        left: 20,
        background: "#111",
        padding: 12,
        borderRadius: 8,
        color: "white",
        zIndex: 9999,
        width: 300,
      }}
    >
      <div style={{ marginBottom: 8 }}>
        <b>Debug QR input</b>
      </div>

      <input
        value={debugInput}
        onChange={(e) => setDebugInput(e.target.value)}
        placeholder="Введите QR (ankf:... / LHT-...)"
        style={{ width: "100%", marginBottom: 8, padding: 6 }}
      />

      <button
        onClick={handleSubmit}
        style={{
          width: "100%",
          padding: 6,
          cursor: "pointer",
        }}
      >
        Отправить
      </button>
    </div>
  );
}