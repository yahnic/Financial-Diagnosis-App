/* ==================================
PORTFOLIO VALUE
================================== */

export function calculatePortfolioValue(portfolio, cycle) {
  let total = 0;

  Object.entries(portfolio).forEach(([asset, amount]) => {
    const assetReturn = cycle.returns[asset] || 0;

    total += amount * (1 + assetReturn / 100);
  });

  return Math.round(total);
}

/* ==================================
NEXT ROUND UPDATE
================================== */

export function applyCycleReturns(portfolio, cycle) {
  const updated = {};

  Object.entries(portfolio).forEach(([asset, amount]) => {
    const assetReturn = cycle.returns[asset] || 0;

    updated[asset] = amount * (1 + assetReturn / 100);
  });

  return updated;
}

/* ==================================
BUY MORE OF AN ASSET
================================== */

export function buyAsset(portfolio, asset, amount) {
  const updated = {
    ...portfolio,
  };

  if ((updated.cash || 0) < amount) {
    return portfolio;
  }

  updated.cash -= amount;

  updated[asset] = (updated[asset] || 0) + amount;

  return updated;
}

/* ==================================
SELL ASSET
================================== */

export function sellAsset(portfolio, asset, amount) {
  const updated = {
    ...portfolio,
  };

  if ((updated[asset] || 0) < amount) {
    return portfolio;
  }

  updated[asset] -= amount;

  updated.cash = (updated.cash || 0) + amount;

  return updated;
}

/* ==================================
BEST PERFORMING ASSET
================================== */

export function detectBestAsset(cycle) {
  let winner = null;

  let best = -999;

  Object.entries(cycle.returns).forEach(([asset, value]) => {
    if (value > best) {
      best = value;

      winner = asset;
    }
  });

  return winner;
}

/* ==================================
WORST ASSET
================================== */

export function detectWorstAsset(cycle) {
  let loser = null;

  let worst = 999;

  Object.entries(cycle.returns).forEach(([asset, value]) => {
    if (value < worst) {
      worst = value;

      loser = asset;
    }
  });

  return loser;
}

/* ==================================
PORTFOLIO RETURN
================================== */

export function calculateScore(startingValue, endingValue) {
  return Math.round(((endingValue - startingValue) / startingValue) * 100);
}

/* ==================================
GRADE SYSTEM
================================== */

export function gameGrade(score) {
  if (score >= 100) return "A+";

  if (score >= 70) return "A";

  if (score >= 40) return "B";

  if (score >= 20) return "C";

  if (score >= 0) return "D";

  return "F";
}

/* ==================================
PHASE GUESS SCORE
================================== */

export function phaseGuessScore(guess, actual) {
  return guess === actual ? 20 : 0;
}

/* ==================================
RECESSION SURVIVAL
================================== */

export function survivedRecession(portfolioValue, startCapital) {
  return portfolioValue >= startCapital * 0.8;
}

/* ==================================
DIVERSIFICATION SCORE
================================== */

export function diversificationScore(portfolio) {
  const activeAssets = Object.values(portfolio).filter((v) => v > 0).length;

  return Math.min(100, activeAssets * 15);
}

/* ==================================
ACHIEVEMENTS
================================== */

export function getAchievements({
  score,
  portfolio,
  startCapital,
  endCapital,
  recessionSurvived,
}) {
  const achievements = [];

  if (score >= 50) {
    achievements.push("🏆 Cycle Master");
  }

  if (recessionSurvived) {
    achievements.push("🏆 Recession Survivor");
  }

  if (diversificationScore(portfolio) >= 75) {
    achievements.push("🏆 Asset Allocator");
  }

  if (endCapital > startCapital * 2) {
    achievements.push("🏆 Wealth Multiplier");
  }

  return achievements;
}

/* ==================================
PORTFOLIO BREAKDOWN %
================================== */

export function portfolioAllocation(portfolio) {
  const total = Object.values(portfolio).reduce((a, b) => a + b, 0);

  const allocation = {};

  Object.entries(portfolio).forEach(([asset, value]) => {
    allocation[asset] = Math.round((value / total) * 100);
  });

  return allocation;
}
