import {
  LineChart, Line,
  BarChart, Bar,
  XAxis, YAxis,
  Tooltip, Legend,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { motion } from 'framer-motion';
import {
  FiTrendingUp,
  FiUsers,
  FiUserX,
  FiCalendar,
  FiBarChart2,
  FiActivity
} from 'react-icons/fi';

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

  // Custom Tooltip Component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-semibold text-gray-900 dark:text-white mb-2">
            {monthFormatter(label)}
          </p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: <span className="font-semibold">{entry.value || 0}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="grid grid-cols-1 gap-6 mt-8">
      {/* Alumni Registrations Chart */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <FiUsers className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Alumni Registrations Over Time
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Monthly alumni registration trends comparison
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <FiCalendar className="w-4 h-4" />
            <span>Monthly</span>
          </div>
        </div>

        {loading ? (
          <ChartLoading message="Loading registrations chart..." />
        ) : (
          <>
            <div className="w-full min-w-0">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mergedMonthly} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E5E7EB"
                    strokeOpacity={0.3}
                  />
                  <XAxis
                    dataKey="month"
                    tickFormatter={monthFormatter}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                    label={{
                      value: "Registrations",
                      angle: -90,
                      position: "insideLeft",
                      offset: -10,
                      style: { textAnchor: 'middle', fill: '#6B7280' }
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    verticalAlign="top"
                    height={36}
                    wrapperStyle={{ fontSize: '14px' }}
                  />
                  <Bar
                    dataKey="currentRegistrations"
                    fill="#3B82F6"
                    name="Current Period"
                    radius={[4, 4, 0, 0]}
                    className="transition-opacity hover:opacity-80"
                  />
                  <Bar
                    dataKey="previousRegistrations"
                    fill="#10B981"
                    name="Previous Period"
                    radius={[4, 4, 0, 0]}
                    className="transition-opacity hover:opacity-80"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Time Period Info */}
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-200 dark:border-gray-600">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Current Period</span>
                    <p className="text-gray-600 dark:text-gray-400">{currentRangeText}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Previous Period</span>
                    <p className="text-gray-600 dark:text-gray-400">{previousRangeText}</p>
                  </div>
                </div>
              </div>

              {/* Descriptions */}
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 space-y-2">
                {registrationsDescription && (
                  <p className="flex items-start space-x-2">
                    <FiTrendingUp className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>{registrationsDescription}</span>
                  </p>
                )}
                {previousRegistrationsDescription && (
                  <p className="flex items-start space-x-2">
                    <FiBarChart2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{previousRegistrationsDescription}</span>
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </motion.div>

      {/* Unemployed Alumni Chart */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <FiUserX className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Unemployed Alumni Trends
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Monthly unemployment rate monitoring
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <FiActivity className="w-4 h-4" />
            <span>Real-time</span>
          </div>
        </div>

        {loading ? (
          <ChartLoading message="Loading unemployment chart..." />
        ) : (
          <>
            <div className="w-full min-w-0">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mergedMonthly} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E5E7EB"
                    strokeOpacity={0.3}
                  />
                  <XAxis
                    dataKey="month"
                    tickFormatter={monthFormatter}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                    label={{
                      value: "Unemployed Alumni",
                      angle: -90,
                      position: "insideLeft",
                      offset: -10,
                      style: { textAnchor: 'middle', fill: '#6B7280' }
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    verticalAlign="top"
                    height={36}
                    wrapperStyle={{ fontSize: '14px' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="currentUnemployed"
                    stroke="#EF4444"
                    strokeWidth={3}
                    name="Current Period"
                    dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#EF4444' }}
                    connectNulls={false}
                    className="transition-all hover:stroke-width-4"
                  />
                  <Line
                    type="monotone"
                    dataKey="previousUnemployed"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    name="Previous Period"
                    strokeDasharray="5 5"
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 3 }}
                    activeDot={{ r: 5, fill: '#3B82F6' }}
                    connectNulls={false}
                    className="transition-all"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Time Period Info */}
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-200 dark:border-gray-600">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Current Period</span>
                    <p className="text-gray-600 dark:text-gray-400">{currentRangeText}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Previous Period</span>
                    <p className="text-gray-600 dark:text-gray-400">{previousRangeText}</p>
                  </div>
                </div>
              </div>

              {/* Descriptions */}
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 space-y-2">
                {unemploymentDescription && (
                  <p className="flex items-start space-x-2">
                    <FiTrendingUp className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>{unemploymentDescription}</span>
                  </p>
                )}
                {previousUnemploymentDescription && (
                  <p className="flex items-start space-x-2">
                    <FiBarChart2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>{previousUnemploymentDescription}</span>
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default DashboardCharts;