import { useMemo, useState } from "react";

import { assets } from "../../data/assets";
import { nigeriaInflation } from "../../data/inflationHistory";
import { coach } from "../../utils/aiPortfolioCoach";
import { saveGameResult } from "../../utils/gameStorage";
import { runRiskDashboard } from "../../utils/runRiskDashboard";

import PortfolioAllocationChart from "../../components/PortfolioAllocationChart";
import PortfolioHeatMap from "../../components/PortfolioHeatMap";
import BenchmarkComparison from "../../components/BenchmarkComparison";
import MonteCarloChart from "../../components/MonteCarloChart";

const STARTING_CAPITAL = 500000;

export default function PortfolioBuilder() {
  let diagnosis = null;

  try {
    diagnosis = JSON.parse(localStorage.getItem("latestDiagnosis"));
  } catch {
    diagnosis = null;
  }

  const [portfolio, setPortfolio] = useState({
    Cash: 10,
    "Money Market Fund": 20,
    "Treasury Bills": 20,
    "NGX Stocks": 20,
    "US Stocks": 10,
    ETF: 10,
    Crypto: 5,
    Gold: 5,
  });

  const assetMap = useMemo(
    () => Object.fromEntries(assets.map((asset) => [asset.name, asset])),
    [],
  );

  const totalAllocation = Object.values(portfolio).reduce(
    (sum, value) => sum + Number(value),
    0,
  );

  const activeAssets = Object.values(portfolio).filter((v) => v > 0).length;

  const currentInflation = nigeriaInflation[2026] || 15.56;

  const analysis = useMemo(() => {
    let expectedReturn = 0;
    let risk = 0;
    let inflationProtection = 0;

    Object.entries(portfolio).forEach(([name, allocation]) => {
      const asset = assetMap[name];

      if (!asset) return;

      expectedReturn += (allocation / 100) * asset.avgReturn;

      risk += (allocation / 100) * asset.risk;

      inflationProtection +=
        (allocation / 100) * (asset.inflationProtection || 0);
    });

    return {
      expectedReturn: expectedReturn.toFixed(2),

      risk: risk.toFixed(2),

      inflationProtection: inflationProtection.toFixed(2),
    };
  }, [portfolio, assetMap]);

  const dashboard = useMemo(() => {
    return runRiskDashboard({
      portfolio,
      assets,
      startingValue: STARTING_CAPITAL,
    });
  }, [portfolio]);

  const realReturn =
    ((1 + Number(analysis.expectedReturn) / 100) /
      (1 + currentInflation / 100) -
      1) *
    100;

  const sp500Return = 11;
  const averageNigerianReturn = 4;

  function riskLabel() {
    const r = Number(analysis.risk);

    if (r < 3) return "🟢 Conservative";

    if (r < 5) return "🟡 Balanced";

    if (r < 7) return "🟠 Growth";

    return "🔴 Aggressive";
  }

  function achievementList() {
    const badges = [];

    if (activeAssets >= 6) badges.push("🏆 Diversification Master");

    if (Number(analysis.inflationProtection) > 8) {
      badges.push("🏆 Inflation Slayer");
    }

    if ((portfolio["US Stocks"] || 0) >= 20) {
      badges.push("🏆 Global Investor");
    }

    if (dashboard.monteCarlo?.expected > 1000000) {
      badges.push("🏆 Millionaire");
    }

    if (dashboard.monteCarlo?.expected > 10000000) {
      badges.push("🏆 Wealth Builder");
    }

    return badges;
  }

  function saveResult() {
    saveGameResult({
      game: "Portfolio Builder",

      score: Math.round(dashboard.monteCarlo.expected / 20000),

      portfolio,

      projection: dashboard.monteCarlo.expected,

      worstCase: dashboard.monteCarlo.worst,

      bestCase: dashboard.monteCarlo.best,

      riskScore: dashboard.riskAnalysis.riskScore,

      healthScore: dashboard.healthScore,

      date: new Date().toISOString(),
    });

    alert("Portfolio saved");
  }

  return (
    <div className="container">
      <h1>Portfolio Builder</h1>

      {/* KEEP ALL YOUR EXISTING ALLOCATION UI */}

      <PortfolioAllocationChart portfolio={portfolio} />

      <PortfolioHeatMap portfolio={portfolio} assets={assets} />

      <MonteCarloChart
        startingValue={STARTING_CAPITAL}
        expectedReturn={Number(analysis.expectedReturn)}
        risk={Number(analysis.risk)}
      />

      <BenchmarkComparison
        portfolioReturn={Number(analysis.expectedReturn)}
        inflation={currentInflation}
      />

      <div className="card">
        <h2>🏥 Financial Health Score</h2>

        <h1>
          {dashboard.healthScore}
          /100 ({dashboard.rating})
        </h1>

        <p>Expected Return: {dashboard.expectedReturn}%</p>

        <p>Risk Score: {dashboard.risk}</p>
      </div>

      <div className="card">
        <h2>📊 10-Year Forecast</h2>

        <p>Worst Case: ₦{dashboard.monteCarlo.worst.toLocaleString()}</p>

        <p>Expected: ₦{dashboard.monteCarlo.expected.toLocaleString()}</p>

        <p>Best Case: ₦{dashboard.monteCarlo.best.toLocaleString()}</p>
      </div>

      <div className="card">
        <h2>🌪 Market Stress Scenarios</h2>

        {dashboard.stressTests.map((test) => (
          <div key={test.scenario}>
            <strong>{test.scenario}</strong>

            <p>
              ₦{test.finalValue.toLocaleString()}({test.impactPercent}
              %)
            </p>
          </div>
        ))}
      </div>

      <div className="card">
        <h2>🔒 Risk Intelligence</h2>

        <p>Risk Score: {dashboard.riskAnalysis.riskScore}</p>

        <p>Grade: {dashboard.riskAnalysis.grade}</p>

        <p>
          Inflation Protection: {dashboard.riskAnalysis.inflationProtection}
          /10
        </p>

        {dashboard.riskAnalysis.suggestions.length > 0 && (
          <>
            <h4>Recommendations</h4>

            <ul>
              {dashboard.riskAnalysis.suggestions.map((suggestion) => (
                <li key={suggestion}>{suggestion}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="card">
        <h2>Portfolio Analysis</h2>

        <p>Expected Return: {analysis.expectedReturn}%</p>

        <p>Risk Score: {analysis.risk}</p>

        <p>Risk Category: {riskLabel()}</p>

        <p>
          Inflation Protection: {analysis.inflationProtection}
          /10
        </p>
      </div>

      <div className="card">
        <h2>Inflation Comparison</h2>

        <p>Portfolio: {analysis.expectedReturn}%</p>

        <p>Inflation: {currentInflation}%</p>

        <p>Real Return: {realReturn.toFixed(2)}%</p>
      </div>

      <div className="card">
        <h2>AI Portfolio Coach</h2>

        <p>{coach(portfolio)}</p>
      </div>

      <div className="card">
        <h2>Achievements</h2>

        <ul>
          {achievementList().map((badge) => (
            <li key={badge}>{badge}</li>
          ))}
        </ul>
      </div>

      <button
        disabled={Math.abs(totalAllocation - 100) > 0.01}
        onClick={saveResult}
      >
        Save Portfolio
      </button>
    </div>
  );
}
