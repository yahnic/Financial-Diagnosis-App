export default function PortfolioHealthCard({ health }) {
  return (
    <div className="card">
      <h2>Portfolio Health</h2>

      <h1>
        {health.score}
        /100
      </h1>

      <p>{health.status}</p>
    </div>
  );
}
