import { useState } from "react";

import { stocksNG } from "../../data/stocksNG";

import StockCard from "../../components/StockCard";

import PortfolioTable from "../../components/PortfolioTable";

import TradeModal from "../../components/TradeModal";

import SandboxLeaderboard from "../../components/SandboxLeaderboard";

import {
  buyStock,
  sellStock,
  updatePrices,
  portfolioValue,
} from "../../utils/stockEngine";

export default function StockSandboxNG() {
  const [market, setMarket] = useState(stocksNG);

  const [selected, setSelected] = useState(null);

  const [portfolio, setPortfolio] = useState({
    cash: 1000000,

    holdings: {},
  });

  function nextDay() {
    setMarket(updatePrices(market));
  }

  function executeBuy(qty) {
    setPortfolio(buyStock(portfolio, selected.symbol, qty, selected.price));

    setSelected(null);
  }

  function executeSell(qty) {
    setPortfolio(sellStock(portfolio, selected.symbol, qty, selected.price));

    setSelected(null);
  }

  const totalValue = portfolioValue(portfolio, market);

  return (
    <div className="container">
      <h1>Stock Sandbox NG</h1>

      <div className="card">
        <h3>Cash: ₦{portfolio.cash.toLocaleString()}</h3>

        <h3>Portfolio: ₦{totalValue.toLocaleString()}</h3>

        <button onClick={nextDay}>Next Day</button>
      </div>

      <SandboxLeaderboard value={totalValue} />

      <PortfolioTable portfolio={portfolio} stocks={market} />

      <h2>Market</h2>

      <div
        style={{
          display: "grid",

          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",

          gap: "16px",
        }}
      >
        {market.map((stock) => (
          <StockCard
            key={stock.symbol}
            stock={stock}
            onBuy={() => setSelected(stock)}
          />
        ))}
      </div>

      <TradeModal
        stock={selected}
        onBuy={executeBuy}
        onSell={executeSell}
        close={() => setSelected(null)}
      />
    </div>
  );
}
