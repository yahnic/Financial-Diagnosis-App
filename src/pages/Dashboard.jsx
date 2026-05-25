import { useEffect, useState } from "react";
import { getReports } from "../utils/storage";

export default function Dashboard() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const saved = getReports() || [];

    const clean = saved.filter(
      (r) => r && r.result && typeof r.result.score === "number",
    );

    setReports(clean);
  }, []);

  if (!reports.length) {
    return (
      <div className="container">
        <h2>No Reports Yet</h2>

        <p>Generate and save a diagnosis report first.</p>
      </div>
    );
  }

  const latest = reports[reports.length - 1];

  const avgScore = Math.round(
    reports.reduce((sum, r) => sum + (r.result?.score || 0), 0) /
      reports.length,
  );

  const avgGlobal = Math.round(
    reports.reduce((sum, r) => sum + (r.result?.globalScore || 0), 0) /
      reports.length,
  );

  const scoreChange =
    (latest.result?.score || 0) - (reports[0]?.result?.score || 0);

  const nigeria = latest.result?.allocationSplit?.nigeria || {};

  const global = latest.result?.allocationSplit?.global || {};

  return (
    <div className="container">
      <h1>Financial Dashboard</h1>

      {/* SUMMARY */}

      <div className="card">
        <h3>Total Reports: {reports.length}</h3>

        <h3>Latest Score: {latest.result.score}</h3>

        <h3>Average Score: {avgScore}</h3>

        <h3>Average Global: {avgGlobal}</h3>

        <h3>
          Score Change: {scoreChange > 0 ? "+" : ""}
          {scoreChange}
        </h3>
      </div>

      {/* SNAPSHOT */}

      <h2>Latest Snapshot</h2>

      <div className="card">
        <p>
          <strong>Investor Type:</strong> {latest.result.level}
        </p>

        <p>
          <strong>Score:</strong> {latest.result.score}
          /100
        </p>

        <p>
          <strong>Global:</strong> {latest.result.globalScore || 0}
          /100
        </p>

        <p>
          <strong>Recommendation:</strong>{" "}
          {latest.result.globalRecommendation || "Unavailable"}
        </p>
      </div>

      {/* ALLOCATION */}

      <h2>Portfolio Allocation</h2>

      <div className="card">
        {/* NIGERIA */}

        <h3>🇳🇬 Nigeria Allocation</h3>

        {Object.keys(nigeria).length ? (
          <ul>
            {Object.entries(nigeria).map(([k, v]) => (
              <li key={k}>
                {k}
                {" — "}
                {v}%
              </li>
            ))}
          </ul>
        ) : (
          <p>No Nigeria allocation data</p>
        )}

        <hr />

        {/* GLOBAL */}

        <h3>🌍 Global Allocation</h3>

        {Object.keys(global).length ? (
          <ul>
            {Object.entries(global).map(([k, v]) => (
              <li key={k}>
                {k}
                {" — "}
                {v}%
              </li>
            ))}
          </ul>
        ) : (
          <p>No global allocation yet</p>
        )}
      </div>

      {/* HISTORY */}

      <h2>History</h2>

      {reports
        .slice()
        .reverse()
        .map((r) => (
          <div key={r.id} className="card">
            <p>
              <strong>Date:</strong> {new Date(r.date).toLocaleDateString()}
            </p>

            <p>
              <strong>Score:</strong> {r.result.score}
            </p>

            <p>
              <strong>Level:</strong> {r.result.level}
            </p>

            <p>
              <strong>Global:</strong> {r.result.globalScore || 0}
            </p>
          </div>
        ))}
    </div>
  );
}
