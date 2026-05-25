export function smartRebalance(result) {
  let actions = [];

  if (result.score < 40) {
    actions.push("Increase emergency reserve");
  }

  if (result.globalScore < 40) {
    actions.push("Delay global investing");
  }

  if (result.globalScore > 70) {
    actions.push("Add 10–20% US exposure");
  }

  if (result.level === "Growth Investor") {
    actions.push("Rebalance every 6 months");
  }

  return actions;
}
