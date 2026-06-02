import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AA66CC",
  "#FF4444",
  "#33B5E5",
];

export default function CyclePortfolioChart({ portfolio }) {
  const data = Object.entries(portfolio).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div
      style={{
        height: 320,
      }}
    >
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={110} label>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
