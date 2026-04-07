const API_BASE = "http://localhost:8000/api";

export type LoginResponse = {
  access_token: string;
  token_type: string;
};

export type DocumentItem = {
  id: number;
  title: string;
  original_filename: string;
  stored_filename: string;
  mime_type: string;
  category: string;
  language: string;
  audience: string;
  status: string;
  description?: string | null;
  created_at: string;
  updated_at: string;
};

export type KnowledgeItem = {
  id: number;
  title: string;
  body: string;
  category: string;
  language: string;
  audience: string;
  tags?: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

export type KnowledgePayload = {
  title: string;
  body: string;
  category: string;
  language: string;
  audience: string;
  tags?: string;
  status: string;
};

export function getToken(): string | null {
  return localStorage.getItem("admin_token");
}

export function setToken(token: string): void {
  localStorage.setItem("admin_token", token);
}

export function clearToken(): void {
  localStorage.removeItem("admin_token");
}

function authHeaders() {
  const token = getToken();
  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE}/admin/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Błędny login lub hasło.");
  }

  return await response.json();
}

export async function fetchDocuments(): Promise<DocumentItem[]> {
  const response = await fetch(`${API_BASE}/admin/documents`, {
    headers: authHeaders(),
  });

  if (!response.ok) {
    throw new Error("Nie udało się pobrać dokumentów.");
  }

  return await response.json();
}

export async function uploadDocument(formData: FormData): Promise<DocumentItem> {
  const response = await fetch(`${API_BASE}/admin/documents/upload`, {
    method: "POST",
    headers: authHeaders(),
    body: formData,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Nie udało się dodać dokumentu: ${text}`);
  }

  return await response.json();
}

export async function deleteDocument(id: number): Promise<void> {
  const response = await fetch(`${API_BASE}/admin/documents/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  if (!response.ok) {
    throw new Error("Nie udało się usunąć dokumentu.");
  }
}

export async function fetchKnowledge(): Promise<KnowledgeItem[]> {
  const response = await fetch(`${API_BASE}/admin/knowledge`, {
    headers: authHeaders(),
  });

  if (!response.ok) {
    throw new Error("Nie udało się pobrać wpisów wiedzy.");
  }

  return await response.json();
}

export async function createKnowledge(payload: KnowledgePayload): Promise<KnowledgeItem> {
  const response = await fetch(`${API_BASE}/admin/knowledge`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Nie udało się dodać wpisu: ${text}`);
  }

  return await response.json();
}

export async function deleteKnowledge(id: number): Promise<void> {
  const response = await fetch(`${API_BASE}/admin/knowledge/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  if (!response.ok) {
    throw new Error("Nie udało się usunąć wpisu.");
  }
}