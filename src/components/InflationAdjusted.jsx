import { useState } from "react";

export default function InflationAdjusted() {
  const [amount, setAmount] = useState(100_000);

  const years = 5;

  const returnRate = 15;

  const inflation = 24;

  const nominal = amount * Math.pow(1 + returnRate / 100, years);

  const real = nominal / Math.pow(1 + inflation / 100, years);

  return (
    <div>
      <h3>Inflation-Adjusted Projection</h3>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />

      <p>Nominal Value</p>

      <h2>₦{Math.round(nominal).toLocaleString()}</h2>

      <p>Real Purchasing Power</p>

      <h2>₦{Math.round(real).toLocaleString()}</h2>
    </div>
  );
}
