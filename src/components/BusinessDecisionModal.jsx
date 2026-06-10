import { useState } from "react";

export default function BusinessDecisionModal({
  expand,
  hire,
  market,
  upgrade,
  loan,
  security,
  training,
  close,
}) {
  const [selectedAction, setSelectedAction] = useState(null);

  const handleClick = (actionName, actionFn) => {
    if (typeof actionFn !== "function") return; // safety check

    setSelectedAction(actionName);
    actionFn();

    // Remove feedback after 1 second
    setTimeout(() => setSelectedAction(null), 1000);
  };

  return (
    <div className="card">
      <h3>Business Decisions</h3>

      <div
        style={{
          display: "grid",
          gap: "10px",
          gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
        }}
      >
        <button
          onClick={() => handleClick("expand", expand)}
          style={{
            backgroundColor: selectedAction === "expand" ? "#4caf50" : "",
            color: selectedAction === "expand" ? "#fff" : "",
          }}
        >
          🏢 Expand Business
        </button>

        <button
          onClick={() => handleClick("hire", hire)}
          style={{
            backgroundColor: selectedAction === "hire" ? "#4caf50" : "",
            color: selectedAction === "hire" ? "#fff" : "",
          }}
        >
          👨‍💼 Hire Staff
        </button>

        <button
          onClick={() => handleClick("market", market)}
          style={{
            backgroundColor: selectedAction === "market" ? "#4caf50" : "",
            color: selectedAction === "market" ? "#fff" : "",
          }}
        >
          📢 Run Marketing Campaign
        </button>

        <button
          onClick={() => handleClick("upgrade", upgrade)}
          style={{
            backgroundColor: selectedAction === "upgrade" ? "#4caf50" : "",
            color: selectedAction === "upgrade" ? "#fff" : "",
          }}
        >
          ⚙️ Upgrade Equipment
        </button>

        <button
          onClick={() => handleClick("loan", loan)}
          style={{
            backgroundColor: selectedAction === "loan" ? "#4caf50" : "",
            color: selectedAction === "loan" ? "#fff" : "",
          }}
        >
          💰 Apply for Loan
        </button>

        <button
          onClick={() => handleClick("security", security)}
          style={{
            backgroundColor: selectedAction === "security" ? "#4caf50" : "",
            color: selectedAction === "security" ? "#fff" : "",
          }}
        >
          🔒 Improve Security
        </button>

        <button
          onClick={() => handleClick("training", training)}
          style={{
            backgroundColor: selectedAction === "training" ? "#4caf50" : "",
            color: selectedAction === "training" ? "#fff" : "",
          }}
        >
          🎓 Staff Training
        </button>
      </div>

      {close && (
        <button
          style={{
            marginTop: "15px",
            width: "100%",
          }}
          onClick={close}
        >
          Close
        </button>
      )}
    </div>
  );
}
