import { useState } from "react";
import { opportunities } from "../../data/opportunities";
import {
  buyOpportunity,
  nextMonth,
  takeLoan,
} from "../../utils/cashflowEngine";

import OpportunityCard from "../../components/OpportunityCard";
import NetWorthCard from "../../components/NetWorthCard";
import PassiveIncomeCard from "../../components/PassiveIncomeCard";
import FreedomMeter from "../../components/FreedomMeter";

export default function CashFlowLadder() {
  const [state, setState] = useState({
    cash: 1000000,
    assets: [],
    liabilities: [],
    loans: [],
  });

  const [page, setPage] = useState(1);
  const pageSize = 6; // items per page

  const totalPages = Math.ceil(opportunities.length / pageSize);

  const paginatedOpps = opportunities.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const handleBuy = (id) => setState(buyOpportunity(state, id));
  const handleLoan = () => setState(takeLoan(state, 500000, 0.12));
  const handleNextMonth = () => setState(nextMonth(state));

  const { cash, assets, liabilities, loans, lastCashflow } = state;

  const netWorth =
    cash +
    assets.reduce((a, b) => a + b.cost, 0) -
    liabilities.reduce((a, b) => a + b.cost, 0) -
    loans.reduce((a, b) => a + b.amount, 0);

  return (
    <div className="container">
      <h1>CashFlow Ladder Simulator</h1>

      {/* Summary Cards */}
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <NetWorthCard
          netWorth={netWorth}
          cash={cash}
          assets={assets}
          liabilities={liabilities}
          loans={loans}
        />
        <PassiveIncomeCard lastCashflow={lastCashflow} />
        <FreedomMeter cashflow={lastCashflow?.netCashflow || 0} />
      </div>

      {/* Controls */}
      <div
        style={{
          margin: "20px 0",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <button onClick={handleNextMonth}>Next Month</button>
        <button onClick={handleLoan}>Take Loan ₦500,000</button>
      </div>

      {/* Opportunities */}
      <h2>Opportunities</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "16px",
        }}
      >
        {paginatedOpps.map((opp) => (
          <OpportunityCard
            key={opp.id}
            opportunity={opp}
            onBuy={() => handleBuy(opp.id)}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          margin: "20px 0",
        }}
      >
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          ⬅ Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next ➡
        </button>
      </div>

      {/* Portfolio Overview */}
      <h2>Portfolio</h2>
      <div
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        <div className="card" style={{ padding: "12px", flex: 1 }}>
          <h3>Assets</h3>
          {assets.length === 0 ? (
            <p>No assets yet</p>
          ) : (
            assets.map((a) => (
              <p key={a.id}>
                {a.title} (₦{a.passiveIncome.toLocaleString()}/mo)
              </p>
            ))
          )}
        </div>
        <div className="card" style={{ padding: "12px", flex: 1 }}>
          <h3>Liabilities</h3>
          {liabilities.length === 0 ? (
            <p>No liabilities</p>
          ) : (
            liabilities.map((l) => (
              <p key={l.id}>
                {l.title} (₦{l.monthlyCost.toLocaleString()}/mo)
              </p>
            ))
          )}
        </div>
        <div className="card" style={{ padding: "12px", flex: 1 }}>
          <h3>Loans</h3>
          {loans.length === 0 ? (
            <p>No loans</p>
          ) : (
            loans.map((l, idx) => (
              <p key={idx}>
                ₦{l.amount.toLocaleString()} at{" "}
                {(l.interestRate * 100).toFixed(1)}% annual
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
