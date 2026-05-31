import { useState, useEffect } from "react";

import GameNewsCard from "../../components/GameNewsCard";

import { inflationEvents } from "../../data/inflationEvents";

import { assetReturns } from "../../data/assetReturns";

import { saveGameResult } from "../../utils/gameStorage";

import { gameGrade } from "../../utils/gameGrade";

import { getAchievements } from "../../utils/gameAchievements";

export default function InflationSurvivor() {
  const [started, setStarted] = useState(false);

  const [difficulty, setDifficulty] = useState("Investor");

  const [round, setRound] = useState(0);

  const [value, setValue] = useState(100000);

  const [history, setHistory] = useState([]);

  const [finished, setFinished] = useState(false);

  const beginnerYears = inflationEvents.slice(0, 3);

  const investorYears = inflationEvents.slice(0, 5);

  const expertYears = [...inflationEvents, ...inflationEvents];

  const gameYears =
    difficulty === "Beginner"
      ? beginnerYears
      : difficulty === "Investor"
        ? investorYears
        : expertYears;

  const grade = gameGrade(value);

  const achievements = getAchievements(history, value);

  useEffect(() => {
    if (!finished) return;

    const alreadySaved = sessionStorage.getItem("inflationSaved");

    if (alreadySaved) return;

    saveGameResult({
      game: "Inflation Survivor",

      score: Math.round(value),

      grade,

      achievements,

      date: new Date().toISOString(),
    });

    sessionStorage.setItem("inflationSaved", "true");
  }, [finished]);

  function play(asset) {
    const current = gameYears[round];

    const assetHistory = assetReturns[asset];

    const assetReturn = assetHistory[round % assetHistory.length];

    const nominal = value * (1 + assetReturn / 100);

    const real = nominal / (1 + current.inflation / 100);

    const result = {
      year: current.year,

      asset,

      inflation: current.inflation,

      return: assetReturn,

      nominal: Math.round(nominal),

      real: Math.round(real),
    };

    setHistory((prev) => [...prev, result]);

    setValue(real);

    if (round === gameYears.length - 1) {
      setFinished(true);
    } else {
      setRound((prev) => prev + 1);
    }
  }

  function restart() {
    sessionStorage.removeItem("inflationSaved");

    setStarted(false);

    setRound(0);

    setValue(100000);

    setHistory([]);

    setFinished(false);
  }

  /* =========================
     START SCREEN
  ========================= */

  if (!started) {
    return (
      <div className="container">
        <div className="card">
          <h1>Inflation Survivor</h1>

          <p>Can you protect ₦100,000 from inflation and grow your wealth?</p>

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

  /* =========================
     END SCREEN
  ========================= */

  if (finished) {
    return (
      <div className="container">
        <div className="card">
          <h1>Game Complete</h1>

          <h2>Final Purchasing Power</h2>

          <h1>₦{Math.round(value).toLocaleString()}</h1>

          <h2>Grade: {grade}</h2>

          <h3>Achievements</h3>

          {achievements.length > 0 ? (
            <ul>
              {achievements.map((achievement) => (
                <li key={achievement}>🏆 {achievement}</li>
              ))}
            </ul>
          ) : (
            <p>No achievements unlocked yet.</p>
          )}

          <button onClick={restart}>Play Again</button>
        </div>

        <div className="card">
          <h2>Investment History</h2>

          {history.map((item, index) => (
            <div key={index}>
              <p>
                <strong>{item.year}</strong>
              </p>

              <p>Asset: {item.asset}</p>

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

  /* =========================
     GAME SCREEN
  ========================= */

  const current = gameYears[round];

  return (
    <div className="container">
      <h1>Inflation Survivor</h1>

      <div className="card">
        <h2>Year: {current.year}</h2>

        <h3>Inflation: {current.inflation}%</h3>

        <h2>Current Wealth</h2>

        <h1>₦{Math.round(value).toLocaleString()}</h1>

        <p>
          Round {round + 1}
          {" / "}
          {gameYears.length}
        </p>
      </div>

      <GameNewsCard headline={current.headline} effect={current.effect} />

      <div className="card">
        <h2>Choose an Asset</h2>

        {Object.keys(assetReturns).map((asset) => (
          <button
            key={asset}
            onClick={() => play(asset)}
            style={{
              margin: "10px",
            }}
          >
            {asset}
          </button>
        ))}
      </div>
    </div>
  );
}
