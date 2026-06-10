export default function AIStockCoach({ messages }) {
  return (
    <div className="card">
      <h2>AI Stock Coach</h2>

      {messages.map((msg, i) => (
        <div
          key={i}
          style={{
            marginBottom: 12,
          }}
        >
          💡 {msg}
        </div>
      ))}
    </div>
  );
}
