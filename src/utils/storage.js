export function saveReport(data, result) {
  const existing = JSON.parse(localStorage.getItem("reports") || "[]");

  const newReport = {
    id: Date.now(),
    date: new Date().toISOString(),
    answers: data,
    result,
  };

  existing.push(newReport);

  localStorage.setItem("reports", JSON.stringify(existing));
}

export function getReports() {
  return JSON.parse(localStorage.getItem("reports") || "[]");
}
