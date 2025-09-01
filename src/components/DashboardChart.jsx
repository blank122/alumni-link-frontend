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
  // Normalize and merge monthly data
  const currentMonthly = data?.current?.monthly?.data || [];
  const previousMonthly = data?.previous?.monthly?.data || [];

  const allMonths = [
    ...new Set([
      ...currentMonthly.map((m) => m.month),
      ...previousMonthly.map((m) => m.month),
    ]),
  ];

  const mergedMonthly = allMonths.map((month) => {
    const current = currentMonthly.find((m) => m.month === month);
    const previous = previousMonthly.find((m) => m.month === month);

    return {
      month,
      currentRegistrations: current ? current.registrations : 0,
      previousRegistrations: previous ? previous.registrations : 0,
      currentUnemployed: current ? current.unemployed : 0,
      previousUnemployed: previous ? previous.unemployed : 0,
    };
  });

  // Descriptions
  const registrationsDescription = data?.current?.monthly?.description;
  const previousRegistrationsDescription = data?.previous?.monthly?.description;

  const unemploymentDescription = data?.current?.monthly?.description;
  const previousUnemploymentDescription = data?.previous?.monthly?.description;

  return (
    <div className="flex flex-col gap-6 mt-8">

      {/* Alumni Registrations Chart */}
      <div className="bg-white p-4 sm:p-6 shadow-lg rounded-lg w-full">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
          Alumni Registrations Over Time
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Tracks monthly alumni registrations (current vs previous).
        </p>
        {loading ? (
          <ChartLoading message="Loading registrations chart..." />
        ) : (
          <>
            <div className="w-full min-w-0">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mergedMonthly}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="currentRegistrations"
                    fill="#4F46E5"
                    name="Current Registrations"
                  />
                  <Bar
                    dataKey="previousRegistrations"
                    fill="#82CA9D"
                    name="Previous Registrations"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Descriptions */}
            <div className="mt-3 text-sm text-gray-600">
              <p>{registrationsDescription}</p>
              <p className="text-gray-500">{previousRegistrationsDescription}</p>
            </div>
          </>
        )}
      </div>

      {/* Unemployed Chart */}
      <div className="bg-white p-4 sm:p-6 shadow-lg rounded-lg w-full">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
          Unemployed Alumni Over Time
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Monthly unemployment trend among alumni (current vs previous).
        </p>
        {loading ? (
          <ChartLoading message="Loading unemployment chart..." />
        ) : (
          <>
            <div className="w-full min-w-0">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mergedMonthly}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="currentUnemployed"
                    stroke="#EF4444"
                    strokeWidth={2}
                    name="Current Unemployed"
                  />
                  <Line
                    type="monotone"
                    dataKey="previousUnemployed"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    name="Previous Unemployed"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            {/* Descriptions */}
            <div className="mt-3 text-sm text-gray-600">
              <p>{unemploymentDescription}</p>
              <p className="text-gray-500">{previousUnemploymentDescription}</p>
            </div>
          </>
        )}
      </div>

    </div>
  );
};

export default DashboardCharts;
