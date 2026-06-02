export default function SandboxLeaderboard({ value }) {
  return (
    <div className="card">
      <h2>Sandbox Score</h2>

      <h1>₦{value.toLocaleString()}</h1>

      <p>Grow your portfolio to become a Wealth Builder</p>
    </div>
  );
}
