// startupEngine.js

export function calculateProfit(revenue, expenses) {
  return revenue - expenses;
}

// Progress a month for the business
export function nextMonth(business) {
  const revenue =
    business.revenue * (1 + business.growth / 100) * randomFactor(0.95, 1.05);
  const expenses = business.expenses * 1.03 * randomFactor(0.98, 1.02);
  const profit = revenue - expenses;

  return {
    revenue: Math.round(revenue),
    expenses: Math.round(expenses),
    profit: Math.round(profit),
  };
}

// Apply event effect to cash or business stats
export function applyEvent(cash, event, business = null) {
  if (!business) return cash + event.effect;

  switch (event.type) {
    case "REVENUE_MULTIPLIER":
      return {
        ...business,
        revenue: Math.round(business.revenue * (1 + event.value)),
      };
    case "EXPENSE_MULTIPLIER":
      return {
        ...business,
        expenses: Math.round(business.expenses * (1 + event.value)),
      };
    case "GROWTH_BOOST":
      return {
        ...business,
        growth: business.growth + event.value,
      };
    case "REVENUE_REDUCTION":
      return {
        ...business,
        revenue: Math.round(business.revenue * (1 - event.value)),
      };
    default:
      return cash + event.effect;
  }
}

// Expand business (increase growth, expenses)
export function expandBusiness(business) {
  return {
    ...business,
    growth: business.growth + 3,
    expenses: business.expenses + 50000,
  };
}

// Hire staff (increase growth, expenses)
export function hireStaff(business) {
  return {
    ...business,
    expenses: business.expenses + 40000,
    growth: business.growth + 2,
  };
}

// Run marketing campaign
export function runMarketing(business) {
  return {
    ...business,
    revenue: Math.round(business.revenue * 1.1),
  };
}

// Upgrade equipment
export function upgradeEquipment(business) {
  return {
    ...business,
    expenses: Math.round(business.expenses * 0.95),
    growth: business.growth + 2,
  };
}

// Apply loan to cash
export function applyLoan(cash) {
  return cash + 500000;
}

// Improve security (reduce risk)
export function improveSecurity(business) {
  return {
    ...business,
    risk: Math.max(1, business.risk - 1),
  };
}

// Train staff (increase revenue and growth)
export function trainStaff(business) {
  return {
    ...business,
    growth: business.growth + 1,
    revenue: Math.round(business.revenue * 1.05),
  };
}

// Helper: small random variation
function randomFactor(min, max) {
  return Math.random() * (max - min) + min;
}
