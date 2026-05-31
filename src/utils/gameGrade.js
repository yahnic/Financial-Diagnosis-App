export function gameGrade(value) {
  if (value >= 200000) return "A";

  if (value >= 150000) return "B";

  if (value >= 120000) return "C";

  if (value >= 100000) return "D";

  return "F";
}
