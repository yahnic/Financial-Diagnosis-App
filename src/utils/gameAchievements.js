export function getAchievements(history, finalValue) {
  const achievements = [];

  const dollars = history.filter((h) => h.asset === "Dollar").length;

  const crypto = history.filter((h) => h.asset === "Bitcoin").length;

  const stocks = history.filter((h) => h.asset === "NGX Stocks").length;

  if (finalValue > 150000) achievements.push("Inflation Slayer");

  if (dollars >= 3) achievements.push("Dollar Defender");

  if (crypto >= 3) achievements.push("Crypto Warrior");

  if (stocks >= 3) achievements.push("Stock Investor");

  return achievements;
}
