export default function GamesHub({ openGame }) {
  return (
    <div className="container">
      <h1>HappyInvest Academy Games</h1>

      <div className="card">
        <h3>Compounding + Inflation Simulator</h3>

        <button onClick={() => openGame("compound")}>Play</button>
      </div>

      <div className="card">
        <h3>Budget Boss</h3>

        <button onClick={() => openGame("budget")}>Play</button>
      </div>
      <div className="card">
        <h3>Debt Race</h3>

        <button onClick={() => openGame("debt")}>Play</button>
      </div>

      <div className="card">
        <h3>Inflation Survivor</h3>

        <p>Can you protect ₦100,000 from Nigerian inflation?</p>

        <button onClick={() => openGame("inflation")}>Play</button>
      </div>
      <div className="card">
        <h3>Portfolio Builder</h3>

        <button onClick={() => openGame("portfolio")}>Play</button>
      </div>
    </div>
  );
}
