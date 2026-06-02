function randomNormal() {
  let u = 0;
  let v = 0;

  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();

  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

export function runMonteCarlo({
  startingValue,
  expectedReturn,
  risk,
  years = 10,
  simulations = 5000,
}) {
  const results = [];

  const volatility = risk * 2; // simple risk model

  for (let i = 0; i < simulations; i++) {
    let value = startingValue;

    for (let y = 0; y < years; y++) {
      const yearlyReturn = expectedReturn + randomNormal() * volatility;

      value *= 1 + yearlyReturn / 100;
    }

    results.push(value);
  }

  results.sort((a, b) => a - b);

  return {
    worst: results[Math.floor(simulations * 0.1)],
    expected: results[Math.floor(simulations * 0.5)],
    best: results[Math.floor(simulations * 0.9)],
  };
}
