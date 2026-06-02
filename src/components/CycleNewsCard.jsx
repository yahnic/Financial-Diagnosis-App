export default function CycleNewsCard({ headline, round }) {
  return (
    <div className="card">
      <h2>Round {round}</h2>

      <h3>Market News</h3>

      <p
        style={{
          fontSize: "18px",
          lineHeight: "1.7",
        }}
      >
        {headline}
      </p>
    </div>
  );
}
