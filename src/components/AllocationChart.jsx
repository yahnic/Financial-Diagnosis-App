import { PieChart, Pie, Cell, Tooltip } from "recharts";

const colors = ["#2C2C78", "#4CAF50", "#FF9800", "#E91E63"];

export default function AllocationChart({ allocation }) {
  const data = allocation.map((item) => {
    const split = item.split("%");

    return {
      name: split[1],

      value: Number(split[0]),
    };
  });

  return (
    <PieChart width={300} height={300}>
      <Pie data={data} dataKey="value" outerRadius={100}>
        {data.map((_, i) => (
          <Cell key={i} fill={colors[i]} />
        ))}
      </Pie>

      <Tooltip />
    </PieChart>
  );
}
