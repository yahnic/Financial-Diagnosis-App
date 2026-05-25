import { useState } from "react";

export default function InvestmentSimulator() {
  const [monthly, setMonthly] = useState(50000);
  const [years, setYears] = useState(5);

  function calculate() {
    const annualReturn = 0.18; // 18% avg (stocks + mixed portfolio)
    const months = years * 12;

    let total = 0;

    for (let i = 0; i < months; i++) {
      total = (total + monthly) * (1 + annualReturn / 12);
    }

    return total.toFixed(0);
  }

  return (
    <div className="card">
      <h3>Investment Growth Simulator</h3>

      {/* INPUTS */}
      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        <input
          type="number"
          value={monthly}
          onChange={(e) => setMonthly(Number(e.target.value))}
          placeholder="Monthly investment"
        />

        <input
          type="number"
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
          placeholder="Years"
        />
      </div>

      {/* OUTPUT */}
      <h2>₦{calculate().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h2>

      <p>Estimated portfolio value</p>

      <small>
        Based on average 18% annual return (mixed global + local portfolio)
      </small>
    </div>
  );
}
