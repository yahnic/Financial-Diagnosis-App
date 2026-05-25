export function rebalance(result, risk) {
  let suggestion = [];

  const allocation = result.allocation.join(" ");

  if (risk === "Low Risk") {
    suggestion = [
      "Increase Money Market allocation",
      "Reduce exposure to stocks",
      "Prioritize capital preservation",
    ];
  }

  if (risk === "Moderate") {
    suggestion = [
      "Maintain balanced portfolio",
      "Rebalance quarterly",
      "Increase diversification across NGX + USD assets",
    ];
  }

  if (risk === "High Risk") {
    suggestion = [
      "Limit speculative crypto exposure to 10-15%",
      "Increase equity exposure gradually",
      "Set stop-loss discipline",
    ];
  }

  if (result.score < 30) {
    suggestion = [
      "Do NOT invest heavily yet",
      "Focus on emergency fund first",
      "Build stable income streams",
    ];
  }

  return suggestion;
}
