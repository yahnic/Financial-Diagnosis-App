// components/OpportunityModal.jsx
export default function OpportunityModal({ opportunity, onBuy, onClose }) {
  return (
    <div
      className="card"
      style={{ marginTop: "20px", padding: "16px", border: "2px solid blue" }}
    >
      <h3>{opportunity.title}</h3>
      <p>Cost: ₦{opportunity.cost.toLocaleString()}</p>
      <p>
        Passive Income: ₦{opportunity.passiveIncome.toLocaleString()} / month
      </p>
      <button onClick={onBuy}>Buy</button>
      <button onClick={onClose} style={{ marginLeft: "10px" }}>
        Cancel
      </button>
    </div>
  );
}
