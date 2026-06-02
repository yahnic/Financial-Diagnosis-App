export function calculatePortfolioValue(portfolio, assetData) {
  let total = 0;

  Object.keys(portfolio).forEach((assetName) => {
    const asset = assetData.find((a) => a.name === assetName);

    if (!asset) return;

    const allocation = portfolio[assetName];

    total += allocation * (1 + asset.return / 100);
  });

  return Math.round(total);
}
