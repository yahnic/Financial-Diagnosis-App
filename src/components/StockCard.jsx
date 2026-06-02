export default function StockCard({
  stock,

  onBuy,
}) {
  return (
    <div className="card">
      <h3>{stock.symbol}</h3>

      <p>{stock.name}</p>

      <p>₦{stock.price.toFixed(2)}</p>

      <p>PE: {stock.pe}</p>

      <p>Sector: {stock.sector}</p>

      <button onClick={() => onBuy(stock)}>Trade</button>
    </div>
  );
}
