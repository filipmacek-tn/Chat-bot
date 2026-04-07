import { useEffect, useState } from "react";
import {
  createKnowledge,
  deleteKnowledge,
  fetchKnowledge,
  type KnowledgeItem,
} from "../services/api";

export default function KnowledgePage() {
  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("ogolne");
  const [language, setLanguage] = useState("pl");
  const [audience, setAudience] = useState("wszyscy");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("draft");
  const [error, setError] = useState("");

  async function load() {
    try {
      const data = await fetchKnowledge();
      setItems(data);
    } catch (err) {
      setError("Nie udało się pobrać wpisów wiedzy.");
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      await createKnowledge({
        title,
        body,
        category,
        language,
        audience,
        tags,
        status,
      });

      setTitle("");
      setBody("");
      setCategory("ogolne");
      setLanguage("pl");
      setAudience("wszyscy");
      setTags("");
      setStatus("draft");

      await load();
    } catch (err) {
      setError("Nie udało się dodać wpisu wiedzy.");
    }
  }

  async function handleDelete(id: number) {
    await deleteKnowledge(id);
    await load();
  }

  return (
    <div>
      <h2>Wpisy wiedzy</h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10, marginBottom: 24 }}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Tytuł" />
        <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Treść" rows={6} />
        <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Kategoria" />
        <input value={language} onChange={(e) => setLanguage(e.target.value)} placeholder="Język" />
        <input value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="Odbiorcy" />
        <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tagi" />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="draft">draft</option>
          <option value="published">published</option>
        </select>
        <button type="submit">Dodaj wpis</button>
      </form>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>ID</th>
            <th style={{ textAlign: "left" }}>Tytuł</th>
            <th style={{ textAlign: "left" }}>Status</th>
            <th style={{ textAlign: "left" }}>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
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