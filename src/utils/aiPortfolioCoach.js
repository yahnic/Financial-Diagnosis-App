export function coach(portfolio) {
  if (portfolio.crypto > 30) return "Too much crypto exposure.";

  if (portfolio.cash > 50) return "Cash losing value to inflation.";

  if (portfolio.usStocks === 0) return "No dollar exposure detected.";

  return "Portfolio appears balanced.";
}
