export default function NetWorthCard({ netWorth, cash }) {
  return (
    <div className="card" style={{ padding: "12px" }}>
      <h3>Net Worth</h3>
      <p>Cash: ₦{cash.toLocaleString()}</p>
      <p>Total Net Worth: ₦{netWorth.toLocaleString()}</p>
    </div>
  );
}
