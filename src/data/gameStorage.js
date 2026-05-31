export function saveGameResult(game, score, value) {
  const results = JSON.parse(localStorage.getItem("gameResults")) || [];

  results.push({
    game,

    score,

    value,

    date: new Date().toISOString(),
  });

  localStorage.setItem(
    "gameResults",

    JSON.stringify(results),
  );
}
