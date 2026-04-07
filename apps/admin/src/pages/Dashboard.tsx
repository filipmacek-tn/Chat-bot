import { useState } from "react";
import DocumentsPage from "./DocumentsPage";
import KnowledgePage from "./KnowledgePage";

type Props = {
  onLogout: () => void;
};

type Tab = "documents" | "knowledge";

export default function Dashboard({ onLogout }: Props) {
  const [tab, setTab] = useState<Tab>("documents");

  return (
    <div style={{ fontFamily: "Arial", padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <h1>Panel admina</h1>
        <button onClick={onLogout}>Wyloguj</button>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <button onClick={() => setTab("documents")}>Dokumenty</button>
        <button onClick={() => setTab("knowledge")}>Wpisy wiedzy</button>
      </div>

      {tab === "documents" && <DocumentsPage />}
      {tab === "knowledge" && <KnowledgePage />}
    </div>
  );
}