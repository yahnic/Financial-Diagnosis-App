export function portfolioHealth(holdings) {
  const total = Object.values(holdings).reduce((a, b) => a + b, 0);

  if (!total)
    return {
      score: 0,
      status: "Empty",
    };

  const largest = Math.max(...Object.values(holdings));

  const concentration = (largest / total) * 100;

  let score = 100;

  if (concentration > 50) score -= 40;

  if (concentration > 70) score -= 30;

  let status = "Excellent";

  if (score < 80) status = "Good";

  if (score < 60) status = "Risky";

  if (score < 40) status = "Very Risky";

  return {
    score,
    status,
  };
}
