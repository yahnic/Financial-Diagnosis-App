export function saveGameResult(result) {
  const saved = JSON.parse(localStorage.getItem("gameResults")) || [];

  saved.push(result);

  localStorage.setItem("gameResults", JSON.stringify(saved));
}
