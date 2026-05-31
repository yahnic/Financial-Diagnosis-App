import { useState } from "react";

const years = [
  { year: 2020, inflation: 13 },
  { year: 2021, inflation: 15 },
  { year: 2022, inflation: 21 },
  { year: 2023, inflation: 28 },
  { year: 2024, inflation: 33 },
  { year: 2025, inflation: 24 },
  { year: 2026, inflation: 15.68 },
];

const assetReturns = {
  Cash: [0, 0, 0, 0, 0],

  Dollar: [15, 12, 20, 25, 18],

  MMF: [10, 11, 12, 13, 12, 15, 18, 20, 22, 25],

  "FGN Bond": [12, 10, 13, 16, 15, 18, 20, 22, 25, 28],

  "NGX Dividend Stocks": [18, 15, 42, 20, 25],
  "NGX Growth Stocks": [10, 5, 55, 30, 25, 50, 60, 70, 80, 90, 100],

  "Treasury Bills": [11, 13, 15, 18, 20],

  "NGX Stocks": [18, -5, 30, 12, 50, 60, 70, 80, 90, 100],

  "US ETF": [10, 8, -12, 20, 15],

  Bitcoin: [150, -60, 90, -30, 70],
  Business: [15, 18, 25, -15, -20, 35, 30],
};

const difficultySettings = {
  Beginner: {
    years: years.slice(0, 3),
    start: 100_000,
  },

  Investor: {
    years: years.slice(0, 5),
    start: 100_000,
  },

  Expert: {
    years,
    start: 100_000,
  },
};

export default function InflationSurvivor() {
  const [difficulty, setDifficulty] = useState("Investor");

  const activeYears = difficultySettings[difficulty].years;

  const startingAmount = difficultySettings[difficulty].start;

  const [round, setRound] = useState(0);

  const [value, setValue] = useState(startingAmount);

  const [history, setHistory] = useState([]);

  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);

  function play(asset) {
    const current = activeYears[round];

    const assetReturn = assetReturns[asset][round];

    const nominal = value * (1 + assetReturn / 100);

    const real = nominal / (1 + current.inflation / 100);

    const result = {
      year: current.year,
      asset,
      return: assetReturn,
      inflation: current.inflation,
      nominal: Math.round(nominal),
      real: Math.round(real),
    };

    setHistory((prev) => [...prev, result]);

    setValue(real);

    if (round === activeYears.length - 1) {
      setFinished(true);
    } else {
      setRound((prev) => prev + 1);
    }
  }

  function restart() {
    const start = difficultySettings[difficulty].start;

    setRound(0);

    setValue(start);

    setHistory([]);

    setFinished(false);
  }

  function changeDifficulty(level) {
    setDifficulty(level);

    setRound(0);

    setValue(difficultySettings[level].start);

    setHistory([]);

    setFinished(false);
  }
  if (!started) {
    return (
      <div className="container">
        <div className="card">
          <h1>Inflation Survivor</h1>

          <p>Can you protect ₦100,000 from inflation?</p>

          <h3>Select Difficulty</h3>

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="Beginner">Beginner (3 Years)</option>

            <option value="Investor">Investor (5 Years)</option>

            <option value="Expert">Expert (10 Years)</option>
          </select>

          <br />
          <br />

          <button onClick={() => setStarted(true)}>Start Game</button>
        </div>
      </div>
    );
  }
  if (finished) {
    const purchasingPowerChange =
      ((value - startingAmount) / startingAmount) * 100;

    return (
      <div className="container">
        <h1>Inflation Survivor</h1>

        <div className="card">
          <h2>Game Complete 🎉</h2>

          <h3>Final Purchasing Power</h3>

          <h1>₦{Math.round(value).toLocaleString()}</h1>

          <p>Started with: ₦{startingAmount.toLocaleString()}</p>

          <p>Purchasing Power Change: {purchasingPowerChange.toFixed(1)}%</p>

          {purchasingPowerChange > 0 ? (
            <p>✅ You beat inflation.</p>
          ) : (
            <p>⚠️ Inflation defeated your wealth.</p>
          )}

          <button onClick={restart}>Play Again</button>
        </div>

        <div className="card">
          <h2>History</h2>

          {history.map((item, index) => (
            <div key={index}>
              <p>
                <strong>{item.year}</strong>
                {" — "}
                {item.asset}
              </p>

              <p>Return: {item.return}%</p>

              <p>Inflation: {item.inflation}%</p>

              <p>Nominal: ₦{item.nominal.toLocaleString()}</p>

              <p>Real: ₦{item.real.toLocaleString()}</p>

              <hr />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const current = activeYears[round];

  return (
    <div className="container">
      <h1>Inflation Survivor</h1>

      <div className="card">
        <h3>Select Difficulty</h3>

        <select
          value={difficulty}
          onChange={(e) => changeDifficulty(e.target.value)}
        >
          <option value="Beginner">Beginner (3 Years)</option>

          <option value="Investor">Investor (5 Years)</option>

          <option value="Expert">Expert (7 Years)</option>
        </select>
      </div>

      <div className="card">
        <h2>
          Year {round + 1} of {activeYears.length}
        </h2>

        <h3>{current.year}</h3>

        <p>
          Inflation: <strong>{current.inflation}%</strong>
        </p>

        <h2>Current Purchasing Power</h2>

        <h1>₦{Math.round(value).toLocaleString()}</h1>

        <p>Choose an asset for this year.</p>
      </div>

      <div className="card">
        <h2>Assets</h2>

        {Object.keys(assetReturns).map((asset) => (
          <button
            key={asset}
            onClick={() => play(asset)}
            style={{
              margin: "8px",
              padding: "10px 14px",
            }}
          >
            {asset}
          </button>
        ))}
      </div>

      {history.length > 0 && (
        <div className="card">
          <h2>Progress</h2>

          {history.map((item, index) => (
            <div key={index}>
              <p>
                {item.year}
                {" - "}
                {item.asset}
              </p>

              <p>
                Return: {item.return}% | Inflation: {item.inflation}%
              </p>

              <p>Purchasing Power: ₦{item.real.toLocaleString()}</p>

              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
