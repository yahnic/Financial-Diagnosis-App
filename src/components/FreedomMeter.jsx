export default function FreedomMeter({ cashflow }) {
  const level =
    cashflow >= 100000
      ? "💎 Financially Free"
      : cashflow >= 50000
        ? "🚀 Growing"
        : "⚠️ Working Hard";

  return (
    <div className="card" style={{ padding: "12px" }}>
      <h3>Freedom Meter</h3>
      <p>Monthly Cashflow: ₦{cashflow.toLocaleString()}</p>
      <p>Status: {level}</p>
    </div>
  );
}
