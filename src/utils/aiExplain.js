export function explain(result, answers) {
  let message = "";

  if (result.score < 30) {
    message = `

Your current financial condition shows
that stability should come before
investing.

Focus on:
• Emergency savings
• Income growth
• Reducing debt

`;
  } else if (result.score < 60) {
    message = `

You are becoming investment ready.

Build stronger savings and gradually
start diversified investing.

`;
  } else {
    message = `

You have a healthy financial profile.

Your next growth stage is consistency,
diversification and long-term wealth.

`;
  }

  if (answers.risk === "High Risk") {
    message += `

You indicated higher risk appetite.
Avoid putting all your money into
high-risk assets.

`;
  }

  return message;
}

export function explainDiagnosis(result, answers) {
  let text = "";

  text += `Your financial score is ${result.score}/100. `;

  text += `You currently fit the profile of a ${result.level}. `;

  if (result.score < 30) {
    text += "You need financial stability before aggressive investing. ";
  } else if (result.score < 60) {
    text += "You are building a stable financial base. ";
  } else {
    text += "You have stronger investment readiness and can diversify. ";
  }

  if (result.globalScore > 60) {
    text += "You show readiness for controlled global exposure. ";
  } else {
    text += "Focus more on local financial strength first. ";
  }

  return text;
}
