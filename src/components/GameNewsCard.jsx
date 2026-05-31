export default function GameNewsCard({ headline, effect }) {
  return (
    <div className="card">
      <h3>📰 Breaking News</h3>

      <h2>{headline}</h2>

      <p>{effect}</p>
    </div>
  );
}
