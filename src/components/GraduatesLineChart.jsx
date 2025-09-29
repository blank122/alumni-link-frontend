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
import { motion } from "framer-motion";
import {
  FiTrendingUp,
  FiUsers,
  FiBookOpen,
  FiCalendar,
  FiAward,
  FiBook
} from "react-icons/fi";

const GraduatesLineChart = ({ data, loading }) => {
  // Custom Tooltip Component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-semibold text-gray-900 dark:text-white mb-3">
            Graduation Year: {label}
          </p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-4 mb-2 last:mb-0">
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">{entry.name}:</span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">
                {entry.value} graduates
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // Calculate totals for summary
  const currentTotal = data?.reduce((sum, item) => sum + (item.currentTotal || 0), 0) || 0;
  const previousTotal = data?.reduce((sum, item) => sum + (item.previousTotal || 0), 0) || 0;
  const totalChange = currentTotal - previousTotal;
  const percentageChange = previousTotal > 0 ? ((totalChange / previousTotal) * 100).toFixed(1) : 0;

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <div className="flex justify-center items-center h-80">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-500 dark:text-gray-400">Loading graduation data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
            <FiBookOpen className="w-6 h-6 text-indigo-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Graduation Trends
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Year-over-year comparison of graduate numbers
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <FiCalendar className="w-4 h-4" />
          <span>Annual</span>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Current Period</p>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-200 mt-1">
                {currentTotal.toLocaleString()}
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">Total Graduates</p>
            </div>
            <FiUsers className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-800 dark:text-orange-300">Previous Period</p>
              <p className="text-2xl font-bold text-orange-900 dark:text-orange-200 mt-1">
                {previousTotal.toLocaleString()}
              </p>
              <p className="text-xs text-orange-700 dark:text-orange-400 mt-1">Total Graduates</p>
            </div>
            <FiAward className="w-8 h-8 text-orange-500" />
          </div>
        </div>

        <div className={`rounded-xl p-4 ${totalChange >= 0
            ? 'bg-green-50 dark:bg-green-900/20'
            : 'bg-red-50 dark:bg-red-900/20'
          }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${totalChange >= 0
                  ? 'text-green-800 dark:text-green-300'
                  : 'text-red-800 dark:text-red-300'
                }`}>
                Change
              </p>
              <p className={`text-2xl font-bold mt-1 ${totalChange >= 0
                  ? 'text-green-900 dark:text-green-200'
                  : 'text-red-900 dark:text-red-200'
                }`}>
                {totalChange >= 0 ? '+' : ''}{totalChange.toLocaleString()}
              </p>
              <p className={`text-xs mt-1 ${totalChange >= 0
                  ? 'text-green-700 dark:text-green-400'
                  : 'text-red-700 dark:text-red-400'
                }`}>
                {percentageChange}% from previous
              </p>
            </div>
            <FiTrendingUp className={`w-8 h-8 ${totalChange >= 0 ? 'text-green-500' : 'text-red-500 rotate-180'
              }`} />
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full min-w-0">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E5E7EB"
              strokeOpacity={0.3}
            />
            <XAxis
              dataKey="year"
              tick={{ fill: '#6B7280', fontSize: 12 }}
              label={{
                value: "Graduation Year",
                position: "insideBottom",
                offset: -5,
                style: { fill: '#6B7280' }
              }}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              label={{
                value: "Number of Graduates",
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
              iconType="circle"
            />
            {/* Current graduates */}
            <Line
              type="linear"
              dataKey="currentTotal"
              stroke="#3B82F6" // blue-500
              strokeWidth={3}
              dot={{
                fill: '#3B82F6',
                strokeWidth: 2,
                r: 5,
                className: "transition-all hover:r-6"
              }}
              activeDot={{
                r: 7,
                fill: '#3B82F6',
                stroke: '#1D4ED8',
                strokeWidth: 2
              }}
              name="Current Graduates"
              className="transition-all hover:stroke-width-4"
            />
            {/* Previous graduates */}
            <Line
              type="linear"
              dataKey="previousTotal"
              stroke="#F59E0B" // amber-500
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{
                fill: '#F59E0B',
                strokeWidth: 2,
                r: 4,
                className: "transition-all hover:r-5"
              }}
              activeDot={{
                r: 6,
                fill: '#F59E0B',
                stroke: '#D97706',
                strokeWidth: 2
              }}
              name="Previous Graduates"
              className="transition-all"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Info */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-200 dark:border-gray-600">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <div>
              <span className="font-medium text-gray-900 dark:text-white">Current Graduates</span>
              <p className="text-gray-600 dark:text-gray-400">
                Most recent graduation cycle data
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
            <div>
              <span className="font-medium text-gray-900 dark:text-white">Previous Graduates</span>
              <p className="text-gray-600 dark:text-gray-400">
                Previous graduation cycle for comparison
              </p>
            </div>
          </div>
        </div>

        {/* Additional Context */}
        <div className="mt-4 flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <FiTrendingUp className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <p>
            Track graduation trends over time to identify patterns and make informed decisions about academic programs and alumni engagement.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default GraduatesLineChart;