export function buyStock(portfolio, symbol, quantity, price) {
  const cost = quantity * price;

  if (portfolio.cash < cost) return portfolio;

  const holdings = {
    ...portfolio.holdings,
  };

  if (!holdings[symbol]) {
    holdings[symbol] = {
      shares: 0,
      avgPrice: 0,
    };
  }

  const current = holdings[symbol];

  const totalCost = current.shares * current.avgPrice + cost;

  const totalShares = current.shares + quantity;

  holdings[symbol] = {
    shares: totalShares,

    avgPrice: totalCost / totalShares,
  };

  return {
    ...portfolio,

    cash: portfolio.cash - cost,

    holdings,
  };
}

export function sellStock(portfolio, symbol, quantity, price) {
  const holding = portfolio.holdings[symbol];

  if (!holding) return portfolio;

  if (holding.shares < quantity) return portfolio;

  const holdings = {
    ...portfolio.holdings,
  };

  holdings[symbol] = {
    ...holding,

    shares: holding.shares - quantity,
  };

  if (holdings[symbol].shares === 0) {
    delete holdings[symbol];
  }

  return {
    ...portfolio,

    cash: portfolio.cash + quantity * price,

    holdings,
  };
}

export function updatePrices(stocks) {
  return stocks.map((stock) => {
    const move = (Math.random() - 0.5) * 0.1;

    return {
      ...stock,

      price: Math.max(1, stock.price * (1 + move)),
    };
  });
}

export function portfolioValue(portfolio, stocks) {
  let total = portfolio.cash;

  Object.entries(portfolio.holdings).forEach(([symbol, data]) => {
    const stock = stocks.find((s) => s.symbol === symbol);

    if (stock) {
      total += stock.price * data.shares;
    }
  });

  return Math.round(total);
}
