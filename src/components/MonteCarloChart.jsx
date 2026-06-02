import { useMemo } from "react";

import { runMonteCarlo } from "../utils/monteCarlo";

export default function MonteCarloChart({ startingValue, expectedReturn }) {
  const result = useMemo(
    () => runMonteCarlo(startingValue, expectedReturn),
    [startingValue, expectedReturn],
  );

  return (
    <div className="card">
      <h2>Monte Carlo Simulation</h2>

      <p>Starting: ₦{startingValue.toLocaleString()}</p>

      <hr />

      <p>Worst Case: ₦{result.worst.toLocaleString()}</p>

      <p>Average Case: ₦{result.expected.toLocaleString()}</p>
      <p>Best Case: ₦{result.best.toLocaleString()}</p>
    </div>
  );
}
