import { useState } from "react";

import { cycles } from "../../data/marketCycles";

import CycleNewsCard from "../../components/CycleNewsCard";

import CyclePortfolioChart from "../../components/CyclePortfolioChart";

import {
  calculatePortfolioValue,
  calculateScore,
  gameGrade,
} from "../../utils/cycleEngine";

export default function MarketCycleSimulator() {
  const START_CAPITAL = 1000000;

  const [round, setRound] = useState(0);

  const [finished, setFinished] = useState(false);

  const [portfolio, setPortfolio] = useState({
    stocks: 300000,

    reits: 150000,

    crypto: 100000,

    gold: 100000,

    cash: 200000,

    tbills: 150000,
  });

  const current = cycles[round];

  function allocate(asset, amount) {
    const updated = {
      ...portfolio,
    };

    if (updated.cash < amount) return;

    updated.cash -= amount;

    updated[asset] += amount;

    setPortfolio(updated);
  }

  function nextRound() {
    const updated = {};

    Object.entries(portfolio).forEach(([asset, value]) => {
      const r = current.returns[asset] || 0;

      updated[asset] = value * (1 + r / 100);
    });

    setPortfolio(updated);

    if (round === cycles.length - 1) {
      setFinished(true);

      return;
    }

    setRound(round + 1);
  }

  const portfolioValue = Math.round(
    Object.values(portfolio).reduce((a, b) => a + b, 0),
  );

  const score = calculateScore(START_CAPITAL, portfolioValue);

  return (
    <div className="container">
      <h1>Market Cycle Simulator</h1>

      {!finished && (
        <>
          <CycleNewsCard headline={current.headline} round={round + 1} />

          <div className="card">
            <h3>Portfolio Value</h3>

            <h2>₦{portfolioValue.toLocaleString()}</h2>
          </div>

          <CyclePortfolioChart portfolio={portfolio} />

          <div className="card">
            <h3>Allocate More Cash</h3>

            <button onClick={() => allocate("stocks", 50000)}>
              Buy Stocks
            </button>

            <button onClick={() => allocate("reits", 50000)}>Buy REITs</button>

            <button onClick={() => allocate("gold", 50000)}>Buy Gold</button>

            <button onClick={() => allocate("crypto", 50000)}>
              Buy Crypto
            </button>

            <button onClick={() => allocate("tbills", 50000)}>
              Buy T-Bills
            </button>
          </div>

          <button onClick={nextRound}>Next Cycle</button>
        </>
      )}

      {finished && (
        <div className="card">
          <h2>Simulation Complete</h2>

          <h3>Final Portfolio</h3>

          <h1>₦{portfolioValue.toLocaleString()}</h1>

          <h2>Return: {score}%</h2>

          <h2>Grade: {gameGrade(score)}</h2>

          <CyclePortfolioChart portfolio={portfolio} />

          <button onClick={() => window.location.reload()}>Play Again</button>
        </div>
      )}
    </div>
  );
}
