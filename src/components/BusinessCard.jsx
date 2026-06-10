export default function BusinessCard({
  business,

  select,
}) {
  return (
    <div className="card">
      <h2>{business.name}</h2>

      <p>Startup Capital: ₦{business.capital.toLocaleString()}</p>

      <p>Monthly Revenue: ₦{business.revenue.toLocaleString()}</p>

      <p>Monthly Expenses: ₦{business.expenses.toLocaleString()}</p>

      <button onClick={() => select(business)}>Start Business</button>
    </div>
  );
}
