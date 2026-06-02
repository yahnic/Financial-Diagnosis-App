export default function BenchmarkComparison({ portfolioReturn, inflation }) {
  const sp500 = 11;

  const averageNigerian = 4;

  return (
    <div className="card">
      <h2>Benchmark Comparison</h2>

      <table width="100%">
        <thead>
          <tr>
            <th>Benchmark</th>

            <th>Return</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Your Portfolio</td>

            <td>{portfolioReturn}%</td>
          </tr>

          <tr>
            <td>Inflation</td>

            <td>{inflation}%</td>
          </tr>

          <tr>
            <td>Average Nigerian</td>

            <td>{averageNigerian}%</td>
          </tr>

          <tr>
            <td>S&P 500</td>

            <td>{sp500}%</td>
          </tr>
        </tbody>
      </table>

      <hr />

      <h3>Analysis</h3>

      {portfolioReturn > inflation ? (
        <p>✅ Beating inflation</p>
      ) : (
        <p>❌ Losing to inflation</p>
      )}

      {portfolioReturn > sp500 ? (
        <p>🚀 Outperforming S&P 500</p>
      ) : (
        <p>📈 Underperforming S&P 500</p>
      )}
    </div>
  );
}
