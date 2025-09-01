import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const GraduatesLineChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="year" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        {/* Current graduates */}
        <Line
          type="monotone"
          dataKey="currentTotal"
          stroke="#8884d8"
          strokeWidth={2}
          name="Current Graduates"
        />
        {/* Previous graduates */}
        <Line
          type="monotone"
          dataKey="previousTotal"
          stroke="#82ca9d"
          strokeWidth={2}
          name="Previous Graduates"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default GraduatesLineChart;
