import { useState } from "react";

export default function GoalPlanner() {
  const [goal, setGoal] = useState("");
  const [amount, setAmount] = useState("");
  const [years, setYears] = useState("");

  const monthly = amount && years ? Math.round(amount / (years * 12)) : 0;

  return (
    <div>
      <h3>Goal Planner</h3>

      <input
        placeholder="Goal (e.g House, Car)"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />

      <input
        placeholder="Amount Needed (₦)"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        placeholder="Years to achieve"
        type="number"
        value={years}
        onChange={(e) => setYears(e.target.value)}
      />

      {monthly > 0 && (
        <>
          <h2>Save ₦{monthly.toLocaleString()} monthly</h2>
          <p>To achieve: {goal}</p>
        </>
      )}
    </div>
  );
}
