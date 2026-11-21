import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function TurbineOutputChart({ turbines }) {

    const chartData = turbines.map((turbine) => ({
  name: turbine.name,
  power: Number.parseFloat(turbine.power)
}));
  return (
    <div className="chart-container">
      <h2>Turbine Output Comparison</h2>
      <ResponsiveContainer width="100%" height={300}>
  <BarChart data={chartData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis
      label={{
        value: "Power (MW)",
        angle: -90,
        position: "insideLeft"
      }}
    />
    <Tooltip />
    <Bar
      dataKey="power"
      fill="#3b82f6"
      name="Power Output"
    />
  </BarChart>
</ResponsiveContainer>
    </div>
  );
}
