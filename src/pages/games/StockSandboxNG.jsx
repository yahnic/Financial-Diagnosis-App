import { useState } from "react";
import { stocksNG } from "../../data/stocksNG";
import StockCard from "../../components/StockCard";
import PortfolioTable from "../../components/PortfolioTable";
import TradeModal from "../../components/TradeModal";
import SandboxLeaderboard from "../../components/SandboxLeaderboard";
import AIStockCoach from "../../components/AIStockCoach";
import { generateStockAdvice } from "../../utils/aiStockCoach";
import PortfolioHealthCard from "../../components/PortfolioHealthCard";
import { portfolioHealth } from "../../utils/portfolioHealth";

import {
  buyStock,
  sellStock,
  updatePrices,
  portfolioValue,
} from "../../utils/stockEngine";

export default function StockSandboxNG() {
  const [market, setMarket] = useState(stocksNG);
  const [selected, setSelected] = useState(null);
  const [coachTips, setCoachTips] = useState([]);
  const health = portfolioHealth(sectorExposure);
  const [portfolio, setPortfolio] = useState({
    cash: 1000000,
    holdings: {}, // sector holdings or stock holdings
  });

  function nextDay() {
    setMarket(updatePrices(market));
  }

  function executeBuy(qty) {
    if (!selected) return;

    const updatedPortfolio = buyStock(
      portfolio,
      selected.symbol,
      qty,
      selected.price,
    );

    setPortfolio(updatedPortfolio);
    setSelected(null);

    const tips = generateStockAdvice({
      action: "BUY",
      stock: selected,
      portfolio: updatedPortfolio.holdings, // use actual holdings
      marketPhase: "Expansion", // can be dynamic later
    });

    setCoachTips(tips);
  }

  function executeSell(qty) {
    if (!selected) return;

    const updatedPortfolio = sellStock(
      portfolio,
      selected.symbol,
      qty,
      selected.price,
    );

    setPortfolio(updatedPortfolio);
    setSelected(null);

    const tips = generateStockAdvice({
      action: "SELL",
      stock: selected,
      portfolio: updatedPortfolio.holdings, // use actual holdings
      marketPhase: "Expansion",
    });

    setCoachTips(tips);
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

      <AIStockCoach messages={coachTips} />

      <PortfolioHealthCard health={health} />

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
