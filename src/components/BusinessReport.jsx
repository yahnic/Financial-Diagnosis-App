export default function BusinessReport({
  cash,

  month,

  revenue,

  expenses,

  profit,
}) {
  return (
    <div className="card">
      <h2>Business Report</h2>

      <p>Month: {month}</p>

      <p>Cash: ₦{cash.toLocaleString()}</p>

      <p>Revenue: ₦{revenue.toLocaleString()}</p>

      <p>Expenses: ₦{expenses.toLocaleString()}</p>

      <p>Profit: ₦{profit.toLocaleString()}</p>
    </div>
  );
}
