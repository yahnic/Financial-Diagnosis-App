import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function PortfolioPieChart({ split }) {
  const nigeriaData = Object.entries(split.nigeria || {}).map(
    ([key, value]) => ({
      name: `NG - ${key}`,
      value,
    }),
  );

  const globalData = Object.entries(split.global || {}).map(([key, value]) => ({
    name: `GL - ${key}`,
    value,
  }));

  const data = [...nigeriaData, ...globalData];

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#845EC2",
    "#FF6F91",
    "#2C73D2",
    "#4FFBDF",
  ];

  return (
    <div className="card">
      <h3>Portfolio Allocation Breakdown</h3>

      <PieChart width={320} height={320}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={110}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
