export default function RiskMap({ result = {} }) {
  const score = result?.score || 0;
  const global = result?.globalScore || 0;

  function getColor(value) {
    if (value < 40) return "#ff4d4d";
    if (value < 70) return "#ffcc00";
    return "#2ecc71";
  }

  return (
    <div className="card">
      <h3>Risk Heat Map</h3>

      <div style={{ display: "flex", gap: 20 }}>
        <div
          style={{
            flex: 1,
            padding: 20,
            background: getColor(score),
            color: "#fff",
            borderRadius: 10,
            textAlign: "center",
          }}
        >
          <h4>Financial Risk</h4>
          <h2>{score}</h2>
        </div>

        <div
          style={{
            flex: 1,
            padding: 20,
            background: getColor(global),
            color: "#fff",
            borderRadius: 10,
            textAlign: "center",
          }}
        >
          <h4>Global Risk</h4>
          <h2>{global}</h2>
        </div>
      </div>
    </div>
  );
}
