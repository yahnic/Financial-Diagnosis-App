export function generateStrategy(result, answers) {
  const strategy = [];

  if (result.score < 30) {
    strategy.push(
      "Focus on survival phase: build emergency fund first",
      "Increase income before investing",
      "Avoid crypto and high-risk assets",
    );
  }

  if (result.score >= 30 && result.score < 60) {
    strategy.push(
      "Start disciplined monthly investing",
      "Use 60% savings / 40% money market",
      "Begin NGX index exposure gradually",
    );
  }

  if (result.score >= 60) {
    strategy.push(
      "Scale diversified portfolio",
      "Add USD assets for inflation protection",
      "Consider REITs + equities + business reinvestment",
    );
  }

  if (answers.risk === "High Risk") {
    strategy.push(
      "Limit speculative assets to 10–15%",
      "Use stop-loss discipline",
      "Avoid emotional trading",
    );
  }

  return strategy;
}
