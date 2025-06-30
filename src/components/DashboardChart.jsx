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
    <div className="flex flex-col gap-6 mt-8">

      {/* Alumni Registrations Chart */}
      <div className="bg-white p-4 sm:p-6 shadow-lg rounded-lg w-full">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
          Alumni Registrations Over Time
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Tracks monthly alumni registrations.
        </p>
        {loading ? (
          <ChartLoading message="Loading clustering analysis chart..." />
        ) : (
          <div className="w-full min-w-0">
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
          </div>
        )}
      </div>

      {/* Unemployed Chart */}
      <div className="bg-white p-4 sm:p-6 shadow-lg rounded-lg w-full">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
          Unemployed Alumni Over Time
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Monthly unemployment trend among alumni.
        </p>
        {loading ? (
          <ChartLoading message="Loading clustering analysis chart..." />
        ) : (
          <div className="w-full min-w-0">
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
          </div>
        )}
      </div>

    </div>
  );
};

export default DashboardCharts;
