import { createChatWidget } from "./chat-ui";

function mountWidget(): void {
  const existing = document.getElementById("school-chat-widget");
  if (existing) return;

  const widget = createChatWidget();
  document.body.appendChild(widget);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountWidget);
} else {
  mountWidget();
}