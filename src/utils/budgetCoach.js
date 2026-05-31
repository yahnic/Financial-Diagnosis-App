export function generateCoach({ emergencyFund, debt, investments }) {
  const strengths = [];

  const weaknesses = [];

  const advice = [];

  if (emergencyFund > 300000) {
    strengths.push("Strong emergency fund");
  } else {
    weaknesses.push("Weak emergency fund");

    advice.push("Build 3–6 months emergency savings");
  }

  if (debt > 0) {
    weaknesses.push("Outstanding debt");

    advice.push("Pay down high-interest debt");
  }

  if (investments > 200000) {
    strengths.push("Good investing habit");
  }

  return {
    strengths,
    weaknesses,
    advice,
  };
}
