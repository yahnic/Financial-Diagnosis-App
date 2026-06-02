export default function PortfolioHeatMap({ portfolio, assets }) {
  function riskEmoji(risk) {
    if (risk <= 2) return "🟢";

    if (risk <= 5) return "🟡";

    if (risk <= 7) return "🟠";

    return "🔴";
  }

  return (
    <div className="card">
      <h2>Portfolio Heat Map</h2>

      <table width="100%">
        <thead>
          <tr>
            <th>Asset</th>

            <th>Allocation</th>

            <th>Risk</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(portfolio).map(([name, value]) => {
            const asset = assets.find((a) => a.name === name);

            if (!asset) return null;

            return (
              <tr key={name}>
                <td>{name}</td>

                <td>{value}%</td>

                <td>
                  {riskEmoji(asset.risk)} {asset.risk}
                  /10
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
