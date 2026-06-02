export function calculatePortfolioRisk(portfolio, assets) {
  let totalRisk = 0;
  let concentrationPenalty = 0;
  let inflationProtection = 0;

  const assetNames = Object.keys(portfolio);

  let activeAssets = 0;

  assetNames.forEach((name) => {
    const allocation = portfolio[name] || 0;
    if (allocation <= 0) return;

    activeAssets++;

    const asset = assets.find((a) => a.name === name);
    if (!asset) return;

    totalRisk += (allocation / 100) * asset.risk;

    inflationProtection +=
      (allocation / 100) * (asset.inflationProtection || 0);

    // Overexposure penalty
    if (
      ["Crypto", "US Stocks", "NGX Stocks"].includes(asset.name) &&
      allocation > 20
    ) {
      concentrationPenalty += (allocation - 20) * 0.5;
    }
  });

  // fewer assets, higher risk
  if (activeAssets < 5) concentrationPenalty += 2;

  const finalRiskScore = totalRisk + concentrationPenalty;

  // Assign letter grade
  let grade = "A";
  if (finalRiskScore > 8) grade = "F";
  else if (finalRiskScore > 7) grade = "E";
  else if (finalRiskScore > 6) grade = "D";
  else if (finalRiskScore > 5) grade = "C";
  else if (finalRiskScore > 4) grade = "B";

  // Suggestions
  const suggestions = [];

  if ((portfolio["Crypto"] || 0) > 15)
    suggestions.push("Reduce Crypto to <15%");

  if ((portfolio["US Stocks"] || 0) > 30)
    suggestions.push("Reduce US Stocks to <30%");

  if ((portfolio["Money Market Fund"] || 0) < 15)
    suggestions.push("Increase Money Market Fund for stability");

  if (activeAssets < 6)
    suggestions.push("Add more asset classes for diversification");

  return {
    riskScore: finalRiskScore.toFixed(2),
    grade,
    suggestions,
    inflationProtection: inflationProtection.toFixed(2),
    activeAssets,
  };
}
