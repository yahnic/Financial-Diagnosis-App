// utils/cashflowEngine.js
import { opportunities } from "../data/opportunities";

const TAX_RATE = 0.1; // 10% tax on profits
const INFLATION_RATE = 0.02; // 2% monthly inflation adjustment

export function calculateCashflow(state) {
  const { cash, assets = [], liabilities = [], loans = [] } = state;

  let passiveIncome = 0;
  let liabilityCost = 0;

  // 1. Income from assets
  assets.forEach((asset) => {
    let income = asset.passiveIncome || 0;

    // Inflation-adjusted for real growth
    income = Math.round(income * (1 + (asset.inflation || INFLATION_RATE)));

    passiveIncome += income;
  });

  // 2. Cost from liabilities
  liabilities.forEach((item) => {
    const monthlyCost = Math.round(
      (item.monthlyCost || 0) * (1 + INFLATION_RATE),
    );
    liabilityCost += monthlyCost;
  });

  // 3. Loan interest
  loans.forEach((loan) => {
    liabilityCost += Math.round((loan.amount * loan.interestRate) / 12);
  });

  // 4. Net cashflow before tax
  let netCashflow = passiveIncome - liabilityCost;

  // 5. Apply taxes
  const taxes = Math.max(0, Math.round(netCashflow * TAX_RATE));
  netCashflow -= taxes;

  return {
    cash: cash + netCashflow,
    passiveIncome,
    liabilityCost,
    taxes,
    netCashflow,
  };
}

export function buyOpportunity(state, opportunityId) {
  const item = opportunities.find((o) => o.id === opportunityId);
  if (!item || state.cash < item.cost) return state;

  const isAsset = item.type === "Asset";

  // Rental property and business ownership get extra fields
  const newItem = { ...item };
  if (item.category === "Rental") newItem.inflation = 0.02;
  if (item.category === "Business") newItem.inflation = 0.03;

  return {
    ...state,
    cash: state.cash - item.cost,
    assets: isAsset ? [...(state.assets || []), newItem] : state.assets || [],
    liabilities: !isAsset
      ? [
          ...(state.liabilities || []),
          { ...item, monthlyCost: Math.round(item.cost * 0.02) },
        ]
      : state.liabilities || [],
  };
}

export function takeLoan(state, amount, interestRate = 0.12) {
  return {
    ...state,
    cash: state.cash + amount,
    loans: [...(state.loans || []), { amount, interestRate }],
  };
}

export function nextMonth(state) {
  const result = calculateCashflow(state);
  return {
    ...state,
    cash: result.cash,
    lastCashflow: result,
  };
}
