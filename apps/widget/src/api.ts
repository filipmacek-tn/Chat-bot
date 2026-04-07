const API_URL = "http://localhost:8000/api/chat";

function getSessionId(): string {
  const existing = localStorage.getItem("school_chat_session_id");
  if (existing) return existing;

  const newId = crypto.randomUUID();
  localStorage.setItem("school_chat_session_id", newId);
  return newId;
}

export type ChatApiResponse = {
  answer: string;
};

export async function sendMessage(userText: string): Promise<ChatApiResponse> {
  const sessionId = getSessionId();

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_text: userText,
      session_id: sessionId,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Błąd API ${response.status}: ${errorText}`);
  }

  const data: ChatApiResponse = await response.json();
  return data;
}