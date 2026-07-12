import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

const data = [
  { name: "Plastic", count: 15 },
  { name: "Paper", count: 10 },
  { name: "Food", count: 8 },
  { name: "Metal", count: 6 },
  { name: "Glass", count: 4 },
];

export default function BarChartCard() {
  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 h-[350px]">

      <h2 className="text-white text-xl font-semibold mb-5">
        Waste Count
      </h2>

      <ResponsiveContainer width="100%" height="90%">

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="count"
            fill="#22c55e"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}