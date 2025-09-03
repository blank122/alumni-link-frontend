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
        <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" />
        <XAxis
          dataKey="year"
          label={{ value: "Year", position: "insideBottom", offset: -5 }}
        />
        <YAxis
          allowDecimals={false}
          label={{
            value: "Number of Graduates",
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Tooltip
          formatter={(value, name) => [`${value} graduates`, name]}
          labelFormatter={(label) => `Year: ${label}`}
        />
        <Legend verticalAlign="top" height={36} />
        {/* Current graduates */}
        <Line
          type="linear"
          dataKey="currentTotal"
          stroke="#1f77b4" // blue
          strokeWidth={2}
          dot={{ r: 4 }}
          name="Current Graduates"
        />
        {/* Previous graduates */}
        <Line
          type="linear"
          dataKey="previousTotal"
          stroke="#ff7f0e" // orange
          strokeWidth={2}
          dot={{ r: 4 }}
          name="Previous Graduates"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default GraduatesLineChart;
