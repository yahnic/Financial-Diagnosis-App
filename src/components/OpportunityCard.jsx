export default function OpportunityCard({ opportunity, onBuy }) {
  const { title, cost, passiveIncome, type } = opportunity;

  return (
    <div className="card" style={{ padding: "12px" }}>
      <h3>{title}</h3>
      <p>Type: {type}</p>
      <p>Cost: ₦{cost.toLocaleString()}</p>
      {type === "Asset" && (
        <p>Passive Income: ₦{passiveIncome.toLocaleString()}</p>
      )}
      <button onClick={onBuy} style={{ marginTop: "10px" }}>
        Buy
      </button>
    </div>
  );
}
