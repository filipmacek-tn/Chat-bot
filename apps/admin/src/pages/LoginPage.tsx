import { useState } from "react";
import { login, setToken } from "../services/api";

type Props = {
  onLogin: (token: string) => void;
};

export default function LoginPage({ onLogin }: Props) {
  const [email, setEmail] = useState("admin@school.local");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const result = await login(email, password);
      setToken(result.access_token);
      onLogin(result.access_token);
    } catch (err) {
      setError("Nie udało się zalogować.");
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "60px auto", fontFamily: "Arial" }}>
      <h1>Panel administratora</h1>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          style={{ padding: 12 }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Hasło"
          style={{ padding: 12 }}
        />
        <button type="submit" style={{ padding: 12 }}>
          Zaloguj
        </button>
      </form>
      {error && <p style={{ color: "crimson" }}>{error}</p>}
    </div>
  );
}