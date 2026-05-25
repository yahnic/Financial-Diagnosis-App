import { useState } from "react";

export default function PortfolioSimulator({ allocation }) {
  const [amount, setAmount] = useState(100000);

  const years = 5;

  const rate = 15;

  const future = Math.round(amount * Math.pow(1 + rate / 100, years));

  return (
    <div>
      <h3>Portfolio Simulator</h3>

      <label>Starting Amount</label>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <h2>₦{future.toLocaleString()}</h2>

      <h3>Estimated value after 5 years</h3>
    </div>
  );
}
