import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#3a7d44", "#f4c95d", "#ff6b6b"];

const AnalyticsCharts = ({ stats }) => {
  const pieData = [
    { name: "Leads", value: stats.leads },
    { name: "Active", value: stats.active },
    { name: "Inactive", value: stats.inactive },
  ];

  const barData = [
    {
      name: "Customers",
      total: stats.totalCustomers,
    },
    {
      name: "Leads",
      total: stats.leads,
    },
    {
      name: "Active",
      total: stats.active,
    },
  ];

  return (
    <div className="charts-grid">

      <div className="chart-card">
        <h3>Status Distribution</h3>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={90}
            >
              {pieData.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3>Overview</h3>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#3a7d44" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default AnalyticsCharts;