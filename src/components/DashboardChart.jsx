import {
  LineChart, Line,
  BarChart, Bar,
  XAxis, YAxis,
  Tooltip, Legend,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

import ChartLoading from "../components/ChartLoading";


const DashboardCharts = ({ data, loading }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

      {/* Alumni Registrations Chart */}
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Alumni Registrations Over Time
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Tracks monthly alumni registrations.
        </p>
        {loading ? (
          <ChartLoading message="Loading clustering analysis chart..." />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="registrations" fill="#4F46E5" name="Registrations" />
            </BarChart>
          </ResponsiveContainer>
        )}

      </div>

      {/* Unemployed Chart */}
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Unemployed Alumni Over Time
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Monthly unemployment trend among alumni.
        </p>
        {loading ? (
          <ChartLoading message="Loading clustering analysis chart..." />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="unemployed"
                stroke="#EF4444"
                strokeWidth={2}
                name="Unemployed"
              />
            </LineChart>
          </ResponsiveContainer>
        )}

      </div>

    </div>
  );
};

export default DashboardCharts;
