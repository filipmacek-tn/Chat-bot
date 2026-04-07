import { useState } from "react";
import { clearToken, getToken } from "./services/api";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [token, setToken] = useState<string | null>(getToken());

  function handleLogin(tokenValue: string) {
    setToken(tokenValue);
  }

  function handleLogout() {
    clearToken();
    setToken(null);
  }

  if (!token) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <Dashboard onLogout={handleLogout} />;
}