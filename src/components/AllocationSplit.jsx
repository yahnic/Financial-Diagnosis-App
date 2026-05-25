export default function AllocationSplit({ split }) {
  return (
    <div>
      <h3>Allocation Split</h3>

      <div>
        <h4>🇳🇬 Nigeria</h4>

        {Object.entries(split.nigeria)

          .map(([k, v]) => (
            <p key={k}>
              {k}:{v}%
            </p>
          ))}
      </div>

      <hr />

      <div>
        <h4>🌍 Global</h4>

        {Object.entries(split.global)

          .map(([k, v]) => (
            <p key={k}>
              {k}:{v}%
            </p>
          ))}
      </div>
    </div>
  );
}
