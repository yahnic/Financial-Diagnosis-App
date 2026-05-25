export function generateStory(result) {
  return `

Financial Life Story

You are currently operating as a ${result.level}.

With a score of ${
    result.score
  }/100, your financial journey is still evolving based on your income stability, savings behavior, and investment decisions.

Your current strategy should focus on:

${result.investments.join(", ")}

Portfolio direction:

- Strengthen emergency savings
- Improve income stability
- Reduce unnecessary debt exposure
- Gradually build diversified investments

Your long-term goal is not just wealth creation, but wealth sustainability.

Over time, your goal is to transition from financial survival → stability → growth → wealth independence.

`;
}
