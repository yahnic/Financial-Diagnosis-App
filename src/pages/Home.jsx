export default function Home({ start }) {
  return (
    <div className="container">
      <h1>Financial Diagnosis</h1>

      <p>
        Answer a few questions to discover the investment strategy that fits
        you.
      </p>

      <button onClick={start}>Start Diagnosis</button>
    </div>
  );
}
