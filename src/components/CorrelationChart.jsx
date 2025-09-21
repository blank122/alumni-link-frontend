import { ResponsiveContainer, XAxis, YAxis, Tooltip, Cell, BarChart, Bar } from "recharts";

const CorrelationChart = ({ data }) => {
  // Normalize colors based on correlation score
  const getColor = (value) => {
    if (value > 0.7) return "#2ecc71"; // strong positive (green)
    if (value > 0.3) return "#f1c40f"; // moderate (yellow)
    if (value > 0) return "#e67e22";   // weak (orange)
    return "#e74c3c";                  // negative (red)
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 20, right: 30, left: 120, bottom: 20 }}
      >
        <XAxis type="number" domain={[-1, 1]} />
        <YAxis type="category" dataKey="metric" />
        <Tooltip />
        <Bar dataKey="score" barSize={30}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getColor(entry.score)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CorrelationChart;
