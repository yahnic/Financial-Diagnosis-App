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
