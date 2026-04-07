import { sendMessage } from "./api";

export function createChatWidget(): HTMLDivElement {
  const container = document.createElement("div");
  container.id = "school-chat-widget";
  container.style.position = "fixed";
  container.style.bottom = "20px";
  container.style.right = "20px";
  container.style.width = "360px";
  container.style.height = "520px";
  container.style.background = "#ffffff";
  container.style.border = "1px solid #dcdcdc";
  container.style.borderRadius = "14px";
  container.style.boxShadow = "0 10px 30px rgba(0,0,0,0.15)";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.overflow = "hidden";
  container.style.fontFamily = "Arial, sans-serif";
  container.style.zIndex = "9999";

  let isCollapsed = false;

  const header = document.createElement("div");
  header.style.background = "#1d4ed8";
  header.style.color = "white";
  header.style.padding = "14px";
  header.style.fontWeight = "bold";
  header.style.fontSize = "16px";
  header.style.cursor = "pointer";
  header.style.display = "flex";
  header.style.alignItems = "center";
  header.style.justifyContent = "space-between";
  header.style.userSelect = "none";

  const title = document.createElement("span");
  title.textContent = "Chat szkoły";

  const toggleIcon = document.createElement("span");
  toggleIcon.textContent = "−";
  toggleIcon.style.fontSize = "20px";
  toggleIcon.style.lineHeight = "1";

  header.appendChild(title);
  header.appendChild(toggleIcon);

  const body = document.createElement("div");
  body.style.display = "flex";
  body.style.flexDirection = "column";
  body.style.flex = "1";
  body.style.minHeight = "0";

  const messages = document.createElement("div");
  messages.style.flex = "1";
  messages.style.padding = "12px";
  messages.style.overflowY = "auto";
  messages.style.background = "#f8fafc";
  messages.style.display = "flex";
  messages.style.flexDirection = "column";
  messages.style.gap = "10px";

  const inputWrapper = document.createElement("div");
  inputWrapper.style.display = "flex";
  inputWrapper.style.padding = "10px";
  inputWrapper.style.borderTop = "1px solid #e5e7eb";
  inputWrapper.style.gap = "8px";
  inputWrapper.style.background = "#fff";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Napisz wiadomość...";
  input.style.flex = "1";
  input.style.padding = "10px";
  input.style.border = "1px solid #cbd5e1";
  input.style.borderRadius = "10px";
  input.style.outline = "none";

  const button = document.createElement("button");
  button.textContent = "Wyślij";
  button.style.padding = "10px 14px";
  button.style.border = "none";
  button.style.borderRadius = "10px";
  button.style.background = "#1d4ed8";
  button.style.color = "white";
  button.style.cursor = "pointer";

  function addMessage(text: string, sender: "user" | "bot"): void {
    const bubble = document.createElement("div");
    bubble.textContent = text;
    bubble.style.maxWidth = "85%";
    bubble.style.padding = "10px 12px";
    bubble.style.borderRadius = "12px";
    bubble.style.whiteSpace = "pre-wrap";
    bubble.style.wordBreak = "break-word";

    if (sender === "user") {
      bubble.style.alignSelf = "flex-end";
      bubble.style.background = "#1d4ed8";
      bubble.style.color = "white";
    } else {
      bubble.style.alignSelf = "flex-start";
      bubble.style.background = "#e2e8f0";
      bubble.style.color = "#111827";
    }

    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
  }

  function toggleCollapse(): void {
    isCollapsed = !isCollapsed;

    if (isCollapsed) {
      body.style.display = "none";
      container.style.height = "56px";
      toggleIcon.textContent = "+";
    } else {
      body.style.display = "flex";
      container.style.height = "520px";
      toggleIcon.textContent = "−";
    }
  }

  async function handleSend(): Promise<void> {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    button.disabled = true;
    input.disabled = true;

    try {
      const response = await sendMessage(text);
      addMessage(response.answer, "bot");
    } catch (error) {
      console.error("Widget error:", error);
      addMessage("Błąd połączenia z API.", "bot");
    } finally {
      button.disabled = false;
      input.disabled = false;
      input.focus();
    }
  }

  header.addEventListener("click", toggleCollapse);

  button.addEventListener("click", () => {
    void handleSend();
  });

  input.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      void handleSend();
    }
  });

  addMessage("Cześć! Jestem chatbotem szkoły. Jak mogę pomóc?", "bot");

  inputWrapper.appendChild(input);
  inputWrapper.appendChild(button);

  body.appendChild(messages);
  body.appendChild(inputWrapper);

  container.appendChild(header);
  container.appendChild(body);

  return container;
}