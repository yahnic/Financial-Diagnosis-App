import { useState, useEffect } from "react";

import { debtProfiles } from "../../data/debtProfiles";

import { totalDebt, applyInterest } from "../../utils/debtEngine";

import { saveGameResult } from "../../utils/gameStorage";

export default function DebtRace() {
  const [debts, setDebts] = useState(JSON.parse(JSON.stringify(debtProfiles)));

  const [month, setMonth] = useState(1);

  const [budget] = useState(40000);

  const [strategy, setStrategy] = useState("Avalanche");

  const [interestPaid, setInterestPaid] = useState(0);

  const [finished, setFinished] = useState(false);

  const [achievement, setAchievement] = useState([]);

  function payDebt() {
    let updated = applyInterest(debts);

    let monthInterest = 0;

    updated.forEach((d, i) => {
      monthInterest += d.balance - debts[i].balance;
    });

    setInterestPaid((prev) => prev + monthInterest);

    let paymentBudget = budget;

    let sorted = [...updated];

    if (strategy === "Avalanche") {
      sorted.sort((a, b) => b.rate - a.rate);
    }

    if (strategy === "Snowball") {
      sorted.sort((a, b) => a.balance - b.balance);
    }

    while (paymentBudget > 0 && sorted.some((d) => d.balance > 0)) {
      const debt = sorted.find((d) => d.balance > 0);

      if (!debt) break;

      const payment = Math.min(debt.balance, paymentBudget);

      debt.balance -= payment;

      paymentBudget -= payment;
    }

    const cleaned = updated.map((d) => ({
      ...d,
      balance: d.balance < 1 ? 0 : Math.round(d.balance),
    }));

    setDebts(cleaned);

    const remaining = totalDebt(cleaned);

    if (remaining <= 0 || month >= 12) {
      finishGame(cleaned);
      return;
    }

    setMonth((prev) => prev + 1);
  }

  function finishGame(finalDebts) {
    let badges = [];

    if (totalDebt(finalDebts) === 0) {
      badges.push("🏆 Debt Free Warrior");
    }

    if (strategy === "Avalanche") {
      badges.push("🏆 Avalanche Master");
    }

    if (strategy === "Snowball") {
      badges.push("🏆 Snowball Champion");
    }

    if (interestPaid > 50000) {
      badges.push("🏆 Interest Killer");
    }

    setAchievement(badges);

    setFinished(true);

    saveGameResult({
      game: "Debt Race",

      score: calculateScore(),

      months: month,

      strategy,

      interestPaid: Math.round(interestPaid),

      achievements: badges,

      date: new Date().toISOString(),
    });
  }

  function calculateScore() {
    const score = 100 - month - Math.round(interestPaid / 1000);

    return Math.max(0, score);
  }

  function resetGame() {
    setDebts(JSON.parse(JSON.stringify(debtProfiles)));

    setMonth(1);

    setInterestPaid(0);

    setFinished(false);

    setAchievement([]);
  }

  if (finished) {
    return (
      <div className="container">
        <h1>Debt Race Complete</h1>

        <div className="card">
          <h2>Score: {calculateScore()}</h2>

          <p>Months Used: {month}</p>

          <p>Interest Paid: ₦{Math.round(interestPaid).toLocaleString()}</p>

          <p>Strategy: {strategy}</p>
        </div>

        <div className="card">
          <h2>Achievements</h2>

          <ul>
            {achievement.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>

        <button onClick={resetGame}>Play Again</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Debt Race</h1>

      <div className="card">
        <h2>Month {month}</h2>

        <h3>Payment Budget: ₦40,000</h3>

        <h3>Total Debt: ₦{Math.round(totalDebt(debts)).toLocaleString()}</h3>
      </div>

      <div className="card">
        <h3>Strategy</h3>

        <select value={strategy} onChange={(e) => setStrategy(e.target.value)}>
          <option>Avalanche</option>

          <option>Snowball</option>

          <option>Manual</option>
        </select>
      </div>

      <div className="card">
        <h2>Debt Portfolio</h2>

        {debts.map((debt) => (
          <div key={debt.id}>
            <h4>{debt.lender}</h4>

            <p>Balance: ₦{Math.round(debt.balance).toLocaleString()}</p>

            <p>
              Interest:
              {debt.rate}%
            </p>

            <hr />
          </div>
        ))}
      </div>

      <button onClick={payDebt}>Next Month</button>
    </div>
  );
}
