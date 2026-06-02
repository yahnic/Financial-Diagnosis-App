import { runMonteCarlo } from "./runMonteCarlo";
import { runStressTests } from "./runStressTests";
import { calculatePortfolioRisk } from "./calculatePortfolioRisk";

export function runRiskDashboard({ portfolio, assets, startingValue }) {
  // Flatten expected return + risk from portfolio
  let expectedReturn = 0;
  let risk = 0;

  Object.entries(portfolio).forEach(([name, allocation]) => {
    const asset = assets.find((a) => a.name === name);

    if (!asset) return;

    expectedReturn += (allocation / 100) * asset.avgReturn;

    risk += (allocation / 100) * asset.risk;
  });

  // 1. Monte Carlo Simulation
  const monteCarlo = runMonteCarlo({
    startingValue,
    expectedReturn,
    risk,
  });

  // 2. Stress Tests
  const stressTests = runStressTests({
    startingValue,
    expectedReturn,
    risk,
  });

  // 3. Risk Engine
  const riskAnalysis = calculatePortfolioRisk(portfolio, assets);

  // 4. Overall Financial Health Score (0–100)
  const diversificationScore = Math.min(riskAnalysis.activeAssets / 8, 1) * 25;

  const riskScore = Math.max(0, 25 - riskAnalysis.riskScore);

  const returnScore = Math.min(expectedReturn / 20, 1) * 25;

  const inflationScore =
    Math.min(riskAnalysis.inflationProtection / 10, 1) * 25;

  const healthScore = Math.round(
    diversificationScore + riskScore + returnScore + inflationScore,
  );

  let rating = "F";
  if (healthScore > 85) rating = "A";
  else if (healthScore > 70) rating = "B";
  else if (healthScore > 55) rating = "C";
  else if (healthScore > 40) rating = "D";

  return {
    monteCarlo,
    stressTests,
    riskAnalysis,
    expectedReturn: expectedReturn.toFixed(2),
    risk: risk.toFixed(2),
    healthScore,
    rating,
  };
}
