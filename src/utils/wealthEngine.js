// =============================
// COMPOUND INTEREST
// =============================

export function calculateCompoundGrowth({
  initialInvestment = 0,
  monthlyContribution = 0,
  annualReturn = 0,
  years = 1,
}) {
  const monthlyRate = annualReturn / 100 / 12;

  let value = initialInvestment;

  const yearlyData = [];

  for (let year = 1; year <= years; year++) {
    for (let month = 0; month < 12; month++) {
      value = value * (1 + monthlyRate) + monthlyContribution;
    }

    yearlyData.push({
      year,
      value: Math.round(value),
    });
  }

  return {
    finalValue: Math.round(value),
    yearlyData,
  };
}

// =============================
// TAX IMPACT
// =============================

export function calculateTaxImpact({ value, taxRate = 10 }) {
  const taxPaid = value * (taxRate / 100);

  return {
    afterTaxValue: Math.round(value - taxPaid),
    taxPaid: Math.round(taxPaid),
  };
}

// =============================
// INFLATION ADJUSTMENT
// =============================

export function calculateInflationAdjustedValue({
  value,
  inflationRate = 20,
  years = 1,
}) {
  const realValue = value / Math.pow(1 + inflationRate / 100, years);

  return Math.round(realValue);
}

// =============================
// REAL RETURN
// =============================

export function calculateRealReturn({ annualReturn, inflationRate }) {
  return (
    ((1 + annualReturn / 100) / (1 + inflationRate / 100) - 1) *
    100
  ).toFixed(2);
}

// =============================
// MASTER SIMULATION
// =============================

export function simulateInvestment({
  initialInvestment,
  monthlyContribution,
  annualReturn,
  inflationRate,
  taxRate,
  years,
}) {
  const growth = calculateCompoundGrowth({
    initialInvestment,
    monthlyContribution,
    annualReturn,
    years,
  });

  const tax = calculateTaxImpact({
    value: growth.finalValue,
    taxRate,
  });

  const realValue = calculateInflationAdjustedValue({
    value: tax.afterTaxValue,
    inflationRate,
    years,
  });

  return {
    finalValue: growth.finalValue,

    afterTaxValue: tax.afterTaxValue,

    taxPaid: tax.taxPaid,

    realValue,

    realReturn: calculateRealReturn({
      annualReturn,
      inflationRate,
    }),

    yearlyData: growth.yearlyData,
  };
}
