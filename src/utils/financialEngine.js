export function diagnose(data) {
  let score = 0;
  let advice = [];
  let investments = [];

  /* =========================
1. INCOME & STABILITY
========================= */

  if (data.income === "₦1m+") score += 25;
  else if (data.income === "₦300k–₦1m") score += 18;
  else if (data.income === "₦100k–₦300k") score += 10;

  if (data.incomeStability === "Very Stable") score += 15;
  if (data.incomeStability === "Somewhat Stable") score += 8;
  if (data.incomeStability === "Unstable") score -= 10;
  if (data.incomeStability === "Very Unstable") score -= 20;

  /* =========================
2. EMERGENCY FUND
========================= */

  if (data.emergencyFund === "No savings") {
    score -= 30;
    advice.push("Build emergency fund before investing");
  }

  if (data.emergencyFund === "1 month") score -= 10;
  if (data.emergencyFund === "1–3 months") score += 5;
  if (data.emergencyFund === "3–6 months") score += 15;
  if (data.emergencyFund === "6+ months") score += 25;

  /* =========================
3. DEBT
========================= */

  if (data.debt === "High debt") {
    score -= 30;
    advice.push("Reduce high-interest debt first");
  }

  if (data.debt === "Moderate debt") score -= 15;

  /* =========================
4. RISK BEHAVIOR
========================= */

  if (data.riskReaction === "Sell immediately") score -= 20;
  if (data.riskReaction === "Wait") score += 5;
  if (data.riskReaction === "Buy more") score += 15;

  if (data.marketCrashBehavior === "Sell everything") {
    score -= 25;
    advice.push("You are not ready for high-risk investments");
  }

  if (data.peerInfluence === "Join immediately") {
    score -= 10;
    advice.push("Avoid emotional/social investing decisions");
  }

  /* =========================
5. EXPERIENCE & KNOWLEDGE
========================= */

  const exp = data.investmentExperience || [];

  if (exp.includes("Stocks")) score += 10;
  if (exp.includes("Crypto")) score += 8;
  if (exp.includes("Real Estate")) score += 10;
  if (exp.includes("Business")) score += 12;

  if (data.investmentKnowledge === "Advanced investing") score += 15;
  if (data.investmentKnowledge === "Basic investing") score += 8;
  if (data.investmentKnowledge === "Nothing") score -= 10;

  /* =========================
6. GOALS & TIME
========================= */

  if (data.timeHorizon === "5+ years") score += 20;
  if (data.timeHorizon === "3–5 years") score += 10;
  if (data.timeHorizon === "Less than 1 year") score -= 20;

  if (data.investmentIntent === "Preserve wealth") score += 5;
  if (data.investmentIntent === "Grow aggressively") score += 15;

  /* =========================
7. NIGERIA ECONOMY FACTORS
========================= */

  if (data.currencyExposure === "Only Naira") {
    score -= 15;
    advice.push("Add USD assets to protect against naira depreciation");
  }

  if (data.inflationProtection === "No") {
    score -= 10;
    advice.push("Inflation is eroding your savings value");
  }

  /* =========================
8. GLOBAL / US STOCK READINESS
========================= */

  let globalScore = 0;

  if (data.usdExposureInterest === "Yes, very interested") globalScore += 20;
  if (data.usdExposureInterest === "Maybe, I want to learn") globalScore += 10;

  if (data.usdComfort === "Very comfortable") globalScore += 20;
  if (data.usdComfort === "Somewhat comfortable") globalScore += 10;

  if (data.fxRiskUnderstanding === "Yes") globalScore += 15;
  if (data.fxRiskUnderstanding === "Somewhat") globalScore += 5;

  if (data.globalAccess?.includes("Yes")) {
    globalScore += 15;
  }

  if (data.globalVsLocal === "Global only") globalScore += 20;
  if (data.globalVsLocal === "Balanced Nigeria + Global") globalScore += 15;

  /* =========================
FINAL LEVEL CLASSIFICATION
========================= */

  let level = "";
  let allocation = [];

  if (score < 30) {
    level = "Survival Investor";
    investments = ["Emergency Fund", "Money Market Fund", "Skills Development"];
    allocation = ["80% Safety", "20% Learning"];
  } else if (score < 50) {
    level = "Conservative Investor";
    investments = ["Treasury Bills", "Money Market Fund", "Low-risk Bonds"];
    allocation = ["60% Safety", "30% Fixed Income", "10% Growth"];
  } else if (score < 70) {
    level = "Balanced Investor";
    investments = ["Nigerian Stocks", "US ETFs", "REITs", "Dollar Assets"];
    allocation = ["40% Growth", "30% Stability", "30% Cash"];
  } else if (score < 85) {
    level = "Growth Investor";
    investments = [
      "NGX Stocks",
      "US Stocks",
      "Real Estate",
      "Business Expansion",
    ];
    allocation = ["60% Growth", "25% Stability", "15% Cash"];
  } else {
    level = "Wealth Builder";
    investments = [
      "Global Stocks",
      "US ETFs",
      "Real Estate",
      "Business",
      "Crypto (limited exposure)",
    ];
    allocation = [
      "50% Growth",
      "20% Business",
      "20% Real Estate",
      "10% Speculative",
    ];
  }

  /* =========================
FINAL OUTPUT
========================= */

  return {
    score: Math.max(0, Math.min(100, score)),
    globalScore: Math.min(100, globalScore),
    level,
    investments,
    allocation,

    /* ✅ NEW STRUCTURE ADDED PROPERLY */
    allocationSplit: {
      nigeria: {
        cash: score < 50 ? 40 : score < 75 ? 20 : 15,
        tbills: score < 50 ? 40 : score < 75 ? 30 : 20,
        stocks: score < 50 ? 10 : score < 75 ? 35 : 50,
        business: score < 50 ? 10 : score < 75 ? 15 : 25,
        realEstate: score < 75 ? 0 : 20,
      },

      global: {
        usStocks: globalScore > 60 ? 50 : 0,
        etfs: globalScore > 60 ? 30 : 0,
        usdCash: globalScore > 60 ? 20 : 100,
      },
    },

    advice,

    globalRecommendation:
      globalScore > 60
        ? "Ready for US/Global stocks exposure"
        : "Not yet ready for significant global exposure",
  };
}
