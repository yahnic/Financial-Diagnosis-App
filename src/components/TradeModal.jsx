import { useState } from "react";

export default function TradeModal({
  stock,

  onBuy,

  onSell,

  close,
}) {
  const [quantity, setQuantity] = useState(10);

  if (!stock) return null;

  return (
    <div className="card">
      <h2>Trade {stock.symbol}</h2>

      <p>Price: ₦{stock.price.toFixed(2)}</p>

      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />

      <br />
      <br />

      <button onClick={() => onBuy(quantity)}>Buy</button>

      <button onClick={() => onSell(quantity)}>Sell</button>

      <button onClick={close}>Close</button>
    </div>
  );
}
