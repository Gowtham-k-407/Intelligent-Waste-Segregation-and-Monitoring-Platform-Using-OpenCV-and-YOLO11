import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Biodegradable", value: 45 },
  { name: "Non-Biodegradable", value: 35 },
  { name: "E-Waste", value: 20 },
];

const COLORS = [
  "#22c55e",
  "#ef4444",
  "#3b82f6",
];

export default function PieChartCard() {
  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 h-[350px]">

      <h2 className="text-white text-xl font-semibold mb-5">
        Waste Distribution
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            outerRadius={110}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
}