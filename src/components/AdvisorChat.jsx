import { useState } from "react";

export default function AdvisorChat({ result }) {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hello 👋 I am your financial advisor. Ask me anything about your report.",
    },
  ]);

  const [input, setInput] = useState("");

  function generateReply(question) {
    const q = question.toLowerCase();

    /* =========================
    SCORE EXPLANATION
    ========================= */
    if (q.includes("why") && q.includes("score")) {
      return `Your score is ${result.score}/100 because it reflects your income stability, savings habits, debt level, and investment behavior.`;
    }

    /* =========================
    INVESTMENT ADVICE
    ========================= */
    if (q.includes("invest")) {
      return `Based on your profile, you should focus on: ${result.investments.join(", ")}`;
    }

    /* =========================
    GLOBAL READINESS
    ========================= */
    if (q.includes("us") || q.includes("global")) {
      return result.globalScore > 60
        ? "You are ready for US/global exposure in a controlled manner."
        : "You are not yet ready for global investing. Focus on stability first.";
    }

    /* =========================
    DEFAULT RESPONSE
    ========================= */
    return "I can help you understand your score, investments, risk level, or global readiness. Try asking differently.";
  }

  function sendMessage() {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    const botMsg = {
      role: "bot",
      text: generateReply(input),
    };

    setMessages([...messages, userMsg, botMsg]);
    setInput("");
  }

  return (
    <div className="card">
      <h3>AI Financial Advisor</h3>

      {/* CHAT BOX */}
      <div
        style={{
          height: 250,
          overflowY: "auto",
          padding: 10,
          border: "1px solid #ddd",
          borderRadius: 10,
          marginBottom: 10,
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              textAlign: m.role === "bot" ? "left" : "right",
              marginBottom: 10,
            }}
          >
            <span
              style={{
                background: m.role === "bot" ? "#eee" : "#4a90e2",
                color: m.role === "bot" ? "#000" : "#fff",
                padding: "8px 12px",
                borderRadius: 10,
                display: "inline-block",
                maxWidth: "80%",
              }}
            >
              {m.text}
            </span>
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div style={{ display: "flex", gap: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your financial advisor..."
          style={{ flex: 1, padding: 10 }}
        />

        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
