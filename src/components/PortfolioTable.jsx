export default function PortfolioTable({
  portfolio,

  stocks,
}) {
  const getPrice = (symbol) =>
    stocks.find((s) => s.symbol === symbol)?.price || 0;

  return (
    <div className="card">
      <h2>Portfolio</h2>

      <table width="100%">
        <thead>
          <tr>
            <th>Symbol</th>

            <th>Shares</th>

            <th>Avg Price</th>

            <th>Current</th>

            <th>Value</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(portfolio.holdings).map(([symbol, data]) => (
            <tr key={symbol}>
              <td>{symbol}</td>

              <td>{data.shares}</td>

              <td>₦{data.avgPrice.toFixed(2)}</td>

              <td>₦{getPrice(symbol).toFixed(2)}</td>

              <td>₦{(getPrice(symbol) * data.shares).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
