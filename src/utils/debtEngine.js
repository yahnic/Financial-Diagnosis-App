export function totalDebt(debts) {
  return debts.reduce((sum, d) => sum + d.balance, 0);
}

export function applyInterest(debts) {
  return debts.map((d) => ({
    ...d,

    balance: d.balance * (1 + d.rate / 100 / 12),
  }));
}
