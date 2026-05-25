export default function ProgressBar({ current, total }) {
  const percent = ((current + 1) / total) * 100;

  return (
    <div>
      <div className="progress">
        <div
          className="progress-fill"
          style={{
            width: `${percent}%`,
          }}
        ></div>
      </div>

      <p>
        Step
        {current + 1}
        of
        {total}
      </p>
    </div>
  );
}
