export default function ScoreMeter({ score }) {
  function color(score) {
    if (score < 30) return "var(--danger)";
    if (score < 60) return "var(--warning)";
    return "var(--success)";
  }

  return (
    <div className="score-box">
      <div
        className="score-circle"
        style={{
          background: `conic-gradient(
            ${color(score)} ${score * 3.6}deg,
            #d52109 0
          )`,
        }}
      >
        <div className="score-inner">
          <h1>{score}</h1>
          <p>/100</p>
        </div>
      </div>
    </div>
  );
}
