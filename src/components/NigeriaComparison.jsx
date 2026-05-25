export default function NigeriaComparison({ score }) {
  const average = 45;

  const difference = score - average;

  const status =
    difference > 0 ? "above" : difference < 0 ? "below" : "equal to";

  return (
    <div>
      <h3>Compare With Average Nigerian</h3>

      <p>
        Average benchmark:
        <strong>45/100</strong>
      </p>

      <h2>
        You are
        {Math.abs(difference)}
        points
        {status}
        average.
      </h2>
    </div>
  );
}
