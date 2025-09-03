import {
  LineChart, Line,
  BarChart, Bar,
  XAxis, YAxis,
  Tooltip, Legend,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

import ChartLoading from "../components/ChartLoading";

// Month formatter for readability
const monthFormatter = (month) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months[parseInt(month, 10) - 1] || month;
};

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
      currentRegistrations: current ? current.registrations : null,
      previousRegistrations: previous ? previous.registrations : null,
      currentUnemployed: current ? current.unemployed : null,
      previousUnemployed: previous ? previous.unemployed : null,
    };
  });

  // Extract ranges
  const currentRange = data?.current?.range || [];
  const previousRange = data?.previous?.range || [];

  // Format dates nicely
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const currentRangeText = currentRange.length === 2
    ? `${formatDate(currentRange[0])} – ${formatDate(currentRange[1])}`
    : "N/A";

  const previousRangeText = previousRange.length === 2
    ? `${formatDate(previousRange[0])} – ${formatDate(previousRange[1])}`
    : "N/A";

  // Descriptions
  const registrationsDescription = data?.current?.monthly?.registrationsDescription;
  const previousRegistrationsDescription = data?.previous?.monthly?.registrationsDescription;

  const unemploymentDescription = data?.current?.monthly?.unemploymentDescription;
  const previousUnemploymentDescription = data?.previous?.monthly?.unemploymentDescription;

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
                  <XAxis dataKey="month" tickFormatter={monthFormatter} />
                  <YAxis
                    allowDecimals={false}
                    label={{ value: "Registrations", angle: -90, position: "insideLeft" }}
                  />
                  <Tooltip
                    formatter={(value, name) => [`${value || 0}`, name]}
                    labelFormatter={(month) => `Month: ${monthFormatter(month)}`}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Bar
                    dataKey="currentRegistrations"
                    fill="#4F46E5"
                    name="Current Registrations"
                  />
                  <Bar
                    dataKey="previousRegistrations"
                    fill="#22C55E"
                    name="Previous Registrations"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Descriptions */}
            <div className="mt-3 text-sm text-gray-600">
              <p className="text-sm text-center text-gray-500 mb-2">Current: {currentRangeText}</p>
              <p className="text-sm text-center text-gray-500 mb-2">Previous: {previousRangeText}</p>
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
                  <XAxis dataKey="month" tickFormatter={monthFormatter} />
                  <YAxis
                    allowDecimals={false}
                    label={{ value: "Unemployed Alumni", angle: -90, position: "insideLeft" }}
                  />
                  <Tooltip
                    formatter={(value, name) => [`${value || 0}`, name]}
                    labelFormatter={(month) => `Month: ${monthFormatter(month)}`}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Line
                    type="monotone"
                    dataKey="currentUnemployed"
                    stroke="#EF4444"
                    strokeWidth={2}
                    name="Current Unemployed"
                    connectNulls={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="previousUnemployed"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    name="Previous Unemployed"
                    connectNulls={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            {/* Descriptions */}
            <div className="mt-3 text-sm text-gray-600">
              <p className="text-sm text-center text-gray-500 mb-2">Current: {currentRangeText}</p>
              <p className="text-sm text-center text-gray-500 mb-2">Previous: {previousRangeText}</p>

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
