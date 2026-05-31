export function getBudgetAchievements({ emergencyFund, netWorth, debt }) {
  const achievements = [];

  if (emergencyFund >= 500000) {
    achievements.push("Emergency Fund Hero");
  }

  if (netWorth >= 1000000) {
    achievements.push("Millionaire Mindset");
  }

  if (debt <= 0) {
    achievements.push("Debt Free Warrior");
  }

  return achievements;
}
