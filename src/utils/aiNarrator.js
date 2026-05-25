export function generateExplanation(result, answers) {
  let text = "";

  /* =========================
CORE IDENTITY
========================= */

  text += `You are currently classified as a ${result.level}. `;

  text += `Your financial score of ${result.score}/100 reflects your income stability, savings behavior, risk appetite, and investment discipline. `;

  /* =========================
STRENGTHS
========================= */

  if (result.score >= 70) {
    text += "You show strong financial discipline and long-term thinking. ";
  } else if (result.score >= 50) {
    text +=
      "You are building a stable foundation, but still have gaps to fix. ";
  } else {
    text +=
      "Your financial foundation is still weak and requires stabilization first. ";
  }

  /* =========================
EMERGENCY FUND INSIGHT
========================= */

  if (answers.emergencyFund === "No savings") {
    text +=
      "You currently lack an emergency fund, which makes investing risky because unexpected expenses can force liquidation. ";
  }

  /* =========================
DEBT INSIGHT
========================= */

  if (answers.debt === "High debt") {
    text +=
      "High debt levels reduce your ability to safely invest and should be addressed first. ";
  }

  /* =========================
NIGERIA CONTEXT
========================= */

  if (answers.currencyExposure === "Only Naira") {
    text +=
      "Your portfolio is heavily exposed to naira depreciation risk, which can reduce long-term purchasing power. ";
  }

  /* =========================
GLOBAL READINESS
========================= */

  if (result.globalScore > 60) {
    text +=
      "You are ready for controlled exposure to US and global markets for diversification. ";
  } else {
    text +=
      "At this stage, focus more on strengthening local financial stability before heavy global exposure. ";
  }

  /* =========================
FINAL MESSAGE
========================= */

  text +=
    "Your best investment strategy is not the one with the highest return, but the one aligned with your risk capacity, time horizon, and financial stability. ";

  return text;
}
