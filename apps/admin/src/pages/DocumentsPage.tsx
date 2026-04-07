import { useEffect, useState } from "react";
import {
  deleteDocument,
  fetchDocuments,
  uploadDocument,
  type DocumentItem,
} from "../services/api";

export default function DocumentsPage() {
  const [items, setItems] = useState<DocumentItem[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("ogolne");
  const [language, setLanguage] = useState("pl");
  const [audience, setAudience] = useState("wszyscy");
  const [status, setStatus] = useState("draft");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  async function load() {
    try {
      const data = await fetchDocuments();
      setItems(data);
    } catch (err) {
      setError("Nie udało się pobrać dokumentów.");
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!file) {
      setError("Wybierz plik.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("language", language);
    formData.append("audience", audience);
    formData.append("status", status);
    formData.append("description", description);
    formData.append("file", file);

    try {
      await uploadDocument(formData);
      setTitle("");
      setCategory("ogolne");
      setLanguage("pl");
      setAudience("wszyscy");
      setStatus("draft");
      setDescription("");
      setFile(null);
      await load();
    } catch (err) {
      setError("Nie udało się dodać dokumentu.");
    }
  }

  async function handleDelete(id: number) {
    await deleteDocument(id);
    await load();
  }

  return (
    <div>
      <h2>Dokumenty</h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10, marginBottom: 24 }}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Tytuł dokumentu" />
        <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Kategoria" />
        <input value={language} onChange={(e) => setLanguage(e.target.value)} placeholder="Język" />
        <input value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="Odbiorcy" />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="draft">draft</option>
          <option value="published">published</option>
        </select>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Opis" />
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <button type="submit">Dodaj dokument</button>
      </form>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>ID</th>
            <th style={{ textAlign: "left" }}>Tytuł</th>
            <th style={{ textAlign: "left" }}>Plik</th>
            <th style={{ textAlign: "left" }}>Status</th>
            <th style={{ textAlign: "left" }}>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.original_filename}</td>
              <td>{item.status}</td>
              <td>
                <button onClick={() => void handleDelete(item.id)}>Usuń</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}