export default function PassiveIncomeCard({ lastCashflow }) {
  if (!lastCashflow) return null;

  return (
    <div className="card" style={{ padding: "12px" }}>
      <h3>Monthly Cashflow</h3>
      <p>Income from Assets: ₦{lastCashflow.passiveIncome.toLocaleString()}</p>
      <p>
        Cost from Liabilities: ₦{lastCashflow.liabilityCost.toLocaleString()}
      </p>
      <p>Net Cashflow: ₦{lastCashflow.netCashflow.toLocaleString()}</p>
    </div>
  );
}
