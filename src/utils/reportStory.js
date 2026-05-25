export function generateStory(result) {
  let actions = [];

  /* =========================
LOW SCORE ACTIONS
========================= */

  if (result.score < 40) {
    actions.push("Focus on building emergency fund before investing");
  }

  /* =========================
GLOBAL READINESS
========================= */

  if (result.globalScore < 50) {
    actions.push("Delay US/global investing until stability improves");
  }

  /* =========================
HIGH READINESS
========================= */

  if (result.globalScore > 70) {
    actions.push("Increase US/global exposure by 10–20%");
  }

  /* =========================
GROWTH INVESTOR RULE
========================= */

  if (result.level === "Growth Investor") {
    actions.push("Rebalance portfolio every 6 months");
  }

  actions.push("Keep portfolio diversified to reduce risk");

  return actions;
}
