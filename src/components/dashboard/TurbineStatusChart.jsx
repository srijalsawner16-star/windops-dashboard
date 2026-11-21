import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const STATUSES = [
  { name: "Operational", color: "#16a34a" },
  { name: "Maintenance", color: "#f59e0b" },
  { name: "Offline", color: "#ef4444" },
];

const TurbineStatusChart = ({ turbines = [] }) => {
  const chartData = STATUSES.map(({ name, color }) => ({
    name,
    color,
    value: turbines.filter((t) => t.status === name).length,
  }));

  return (
    <>
      <h3>Turbine Status Distribution</h3>

      <ResponsiveContainer width="100%" height={500}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            innerRadius={65}
            outerRadius={100}
            paddingAngle={4}
          >
            {chartData.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default TurbineStatusChart;
