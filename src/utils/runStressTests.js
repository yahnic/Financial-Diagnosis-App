export function runStressTests({
  startingValue,
  expectedReturn,
  risk,
  years = 10,
}) {
  const scenarios = {
    normal: {
      label: "Normal Market",
      shock: 0,
    },

    crash2008: {
      label: "2008 Financial Crash",
      shock: -25,
    },

    techCrash: {
      label: "Tech Sector Crash",
      shock: -30,
    },

    fxShock: {
      label: "FX Devaluation Shock (NGN)",
      shock: -20,
    },

    oilShock: {
      label: "Oil / Energy Shock",
      shock: -15,
    },

    globalCrisis: {
      label: "Global Crisis (COVID-like)",
      shock: -22,
    },
  };

  const results = [];

  Object.entries(scenarios).forEach(([key, scenario]) => {
    let value = startingValue;

    for (let i = 0; i < years; i++) {
      // base return + volatility + shock
      const volatility = (Math.random() * 2 - 1) * risk * 2;

      const yearlyReturn = expectedReturn + volatility + scenario.shock;

      value *= 1 + yearlyReturn / 100;
    }

    results.push({
      scenario: scenario.label,
      finalValue: Math.round(value),
      impactPercent: (((value - startingValue) / startingValue) * 100).toFixed(
        2,
      ),
    });
  });

  return results;
}
