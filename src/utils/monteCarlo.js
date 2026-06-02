export function runMonteCarlo(
  startingValue,
  expectedReturn,
  risk,
  years = 10,
  simulations = 5000,
) {
  const results = [];

  const volatility = risk * 2;

  for (let i = 0; i < simulations; i++) {
    let value = startingValue;

    for (let y = 0; y < years; y++) {
      const yearlyReturn =
        expectedReturn + (Math.random() * 2 - 1) * volatility;

      value *= 1 + yearlyReturn / 100;
    }

    results.push(value);
  }

  results.sort((a, b) => a - b);

  const worst = results[Math.floor(simulations * 0.1)];

  const median = results[Math.floor(simulations * 0.5)];

  const best = results[Math.floor(simulations * 0.9)];

  return {
    worst: Math.round(worst).toLocaleString(),
    expected: Math.round(median).toLocaleString(),
    best: Math.round(best).toLocaleString(),
  };
}
