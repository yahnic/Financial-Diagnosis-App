import { useMemo } from "react";

export default function MonteCarlo() {
  const values = useMemo(() => {
    let arr = [];

    for (let i = 0; i < 300; i++) {
      let amount = 100000;

      for (let y = 0; y < 5; y++) {
        const growth = Math.random() * 30 - 5;

        amount *= 1 + growth / 100;
      }

      arr.push(Math.round(amount));
    }

    return arr;
  }, []);

  const average = Math.round(values.reduce((a, b) => a + b) / values.length);

  const best = Math.max(...values);

  const worst = Math.min(...values);

  return (
    <div>
      <h3>Portfolio Scenario Simulation</h3>

      <p>300 simulations</p>

      <h2>Average: ₦{average.toLocaleString()}</h2>

      <p>Best: ₦{best.toLocaleString()}</p>

      <p>Worst: ₦{worst.toLocaleString()}</p>
    </div>
  );
}
