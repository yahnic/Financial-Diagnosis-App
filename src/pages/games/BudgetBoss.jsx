import { useState, useEffect } from "react";

import { careers, familyMultipliers } from "../../data/careers";
import { difficulties } from "../../data/difficulties";
import { budgetEvents } from "../../data/budgetEvents";

import { calculateBudgetScore } from "../../utils/budgetEngine";
import { getBudgetAchievements } from "../../utils/budgetAchievements";
import { generateCoach } from "../../utils/budgetCoach";

import { saveGameResult } from "../../utils/gameStorage";

export default function BudgetBoss() {
  const [started, setStarted] = useState(false);

  const [career, setCareer] = useState("Graduate");

  const [family, setFamily] = useState("Single");

  const [difficulty, setDifficulty] = useState("Medium");

  const [month, setMonth] = useState(1);

  const [finished, setFinished] = useState(false);

  const [salary, setSalary] = useState(150000);

  const [event, setEvent] = useState(null);

  const [debt, setDebt] = useState(0);

  const [emergencyFund, setEmergencyFund] = useState(0);

  const [investments, setInvestments] = useState(0);

  const [cash, setCash] = useState(0);

  const [netWorth, setNetWorth] = useState(0);

  const [history, setHistory] = useState([]);

  const [budget, setBudget] = useState({
    housing: 30,
    food: 15,
    transport: 10,
    entertainment: 10,
    savings: 10,
    emergency: 15,
    investment: 10,
  });

  // useEffect(() => {
  //   const baseSalary = careers[career];

  //   setSalary(baseSalary);
  // }, [career]);

  useEffect(() => {
    const baseSalary = careers[career.toLowerCase()] ?? 0;
    setSalary(baseSalary);
  }, [career]);

  function updateBudget(name, value) {
    setBudget({
      ...budget,
      [name]: Number(value),
    });
  }

  function nextMonth() {
    const multiplier = familyMultipliers[family];

    const inflation = difficulties[difficulty].inflation;

    const income = salary;

    const emergencyContribution = income * (budget.emergency / 100);

    const investmentContribution = income * (budget.investment / 100);

    const savingsContribution = income * (budget.savings / 100);

    let monthlyCash =
      income -
      emergencyContribution -
      investmentContribution -
      savingsContribution;

    monthlyCash = monthlyCash * (1 - inflation / 1000);

    let currentEvent = null;

    if (Math.random() < difficulties[difficulty].eventChance) {
      currentEvent =
        budgetEvents[Math.floor(Math.random() * budgetEvents.length)];

      monthlyCash -= currentEvent.cost * multiplier;

      if (monthlyCash < 0) {
        setDebt((prev) => prev + Math.abs(monthlyCash));

        monthlyCash = 0;
      }
    }

    const newEmergency = emergencyFund + emergencyContribution;

    const newInvestments = investments + investmentContribution;

    const newCash = cash + monthlyCash;

    const newNetWorth = newCash + newEmergency + newInvestments - debt;

    setEmergencyFund(newEmergency);

    setInvestments(newInvestments);

    setCash(newCash);

    setNetWorth(newNetWorth);

    setEvent(currentEvent);

    setHistory((prev) => [
      ...prev,
      {
        month,
        income,
        emergency: newEmergency,
        investments: newInvestments,
        debt,
        netWorth: newNetWorth,
      },
    ]);

    if (month >= 12) {
      setFinished(true);
      return;
    }

    setMonth((prev) => prev + 1);
  }

  const score = calculateBudgetScore({
    emergencyFund,
    investments,
    debt,
    netWorth,
  });

  const achievements = getBudgetAchievements({
    emergencyFund,
    netWorth,
    debt,
  });

  const coach = generateCoach({
    emergencyFund,
    debt,
    investments,
  });

  useEffect(() => {
    if (!finished) return;

    saveGameResult({
      game: "Budget Boss",

      score,

      emergencyFund,

      investments,

      netWorth,

      debt,

      achievements,

      date: new Date().toISOString(),
    });
  }, [finished]);

  if (!started) {
    return (
      <div className="container">
        <div className="card">
          <h1>Budget Boss</h1>

          <h3>Career</h3>

          <select value={career} onChange={(e) => setCareer(e.target.value)}>
            {Object.keys(careers).map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <h3>Family</h3>

          <select value={family} onChange={(e) => setFamily(e.target.value)}>
            <option>Single</option>

            <option>Married</option>

            <option>MarriedWithKids</option>
          </select>

          <h3>Difficulty</h3>

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            {Object.keys(difficulties).map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>

          <br />
          <br />

          <button onClick={() => setStarted(true)}>Start Game</button>
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="container">
        <h1>Budget Boss Report</h1>

        <div className="card">
          <h2>
            Score:
            {score}
            /100
          </h2>

          <p>Net Worth: ₦{Math.round(netWorth).toLocaleString()}</p>

          <p>Emergency Fund: ₦{Math.round(emergencyFund).toLocaleString()}</p>

          <p>Investments: ₦{Math.round(investments).toLocaleString()}</p>

          <p>Debt: ₦{Math.round(debt).toLocaleString()}</p>
        </div>

        <div className="card">
          <h2>Achievements</h2>

          <ul>
            {achievements.map((achievement) => (
              <li key={achievement}>🏆 {achievement}</li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h2>Financial Coach</h2>

          <h3>Strengths</h3>

          <ul>
            {coach.strengths.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>

          <h3>Weaknesses</h3>

          <ul>
            {coach.weaknesses.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>

          <h3>Recommendations</h3>

          <ul>
            {coach.advice.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Budget Boss</h1>

      <div className="card">
        <h2>Month {month}/12</h2>

        <h3>Salary: ₦{salary.toLocaleString()}</h3>

        <h3>Emergency Fund: ₦{Math.round(emergencyFund).toLocaleString()}</h3>

        <h3>Investments: ₦{Math.round(investments).toLocaleString()}</h3>

        <h3>Net Worth: ₦{Math.round(netWorth).toLocaleString()}</h3>

        <h3>Debt: ₦{Math.round(debt).toLocaleString()}</h3>
      </div>

      <div className="card">
        <h2>Budget Allocation</h2>

        {Object.keys(budget).map((item) => (
          <div key={item}>
            <label>{item}</label>
            <input
              type="range"
              min="0"
              max="50"
              value={budget[item]}
              onChange={(e) => updateBudget(item, e.target.value)}
            />
            {budget[item]}%
          </div>
        ))}
      </div>

      {event && (
        <div className="card">
          <h2>🚨 Event</h2>

          <p>{event.title}</p>

          <p>Cost: ₦{(event.cost ?? 0).toLocaleString()}</p>
        </div>
      )}

      <button onClick={nextMonth}>Next Month</button>
    </div>
  );
}
