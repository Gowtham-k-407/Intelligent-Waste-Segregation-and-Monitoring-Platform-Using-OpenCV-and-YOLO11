import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#22c55e",
  "#ef4444",
  "#3b82f6",
];

export default function PieChartCard({ data }) {

  if (!data || data.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-slate-500">
        No prediction available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>

        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip />

      </PieChart>
    </ResponsiveContainer>
  );
}