import { budgetEvents } from "../data/budgetEvents";

export function calculateBudgetScore(budget) {
  let score = 100;

  const income = Number(budget.income || 0);

  const savings = Number(budget.savings || 0);

  const emergency = Number(budget.emergency || 0);

  const investment = Number(budget.investment || 0);

  // Basic budgeting rules

  if (savings < 10) score -= 15;

  if (emergency < 10) score -= 15;

  if (investment < 10) score -= 10;

  // Emergency cash available

  let reserve = income * ((savings + emergency) / 100);

  // Pick 3 random events

  const shuffled = [...budgetEvents].sort(() => Math.random() - 0.5);

  const testEvents = shuffled.slice(0, 3);

  for (const event of testEvents) {
    reserve -= event.amount;

    // Expense event

    if (event.amount > 0 && reserve < 0) {
      score -= 20;
    }

    // Positive cash inflow

    if (event.amount < 0) {
      score += 5;
    }
  }

  // Reward strong reserve planning

  if (reserve > income * 0.1) {
    score += 10;
  }

  score = Math.max(0, Math.min(100, score));

  return {
    score,
    events: testEvents,
    remainingReserve: Math.round(reserve),
  };
}
