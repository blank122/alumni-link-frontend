import { ResponsiveContainer, XAxis, YAxis, Tooltip, Cell, BarChart, Bar, CartesianGrid, Legend } from "recharts";
import { motion } from "framer-motion";
import {
  FiTrendingUp,
  FiTrendingDown,
  FiMinus,
  FiBarChart2,
  FiInfo
} from "react-icons/fi";

const CorrelationChart = ({ data, loading }) => {
  // Enhanced color scheme with Tailwind colors
  const getColor = (value) => {
    if (value > 0.7) return "#10B981"; // strong positive (green-500)
    if (value > 0.3) return "#F59E0B"; // moderate (amber-500)
    if (value > 0) return "#F97316";   // weak (orange-500)
    if (value > -0.3) return "#EF4444"; // weak negative (red-500)
    if (value > -0.7) return "#DC2626"; // moderate negative (red-600)
    return "#991B1B";                  // strong negative (red-800)
  };

  const getCorrelationStrength = (value) => {
    if (value > 0.7) return { label: "Strong Positive", icon: FiTrendingUp, color: "text-green-600" };
    if (value > 0.3) return { label: "Moderate Positive", icon: FiTrendingUp, color: "text-amber-600" };
    if (value > 0) return { label: "Weak Positive", icon: FiTrendingUp, color: "text-orange-600" };
    if (value > -0.3) return { label: "Weak Negative", icon: FiTrendingDown, color: "text-red-500" };
    if (value > -0.7) return { label: "Moderate Negative", icon: FiTrendingDown, color: "text-red-600" };
    return { label: "Strong Negative", icon: FiTrendingDown, color: "text-red-800" };
  };

  // Custom Tooltip Component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      const strength = getCorrelationStrength(value);
      const IconComponent = strength.icon;

      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-semibold text-gray-900 dark:text-white mb-2">{label}</p>
          <div className="flex items-center space-x-2 mb-2">
            <IconComponent className={`w-4 h-4 ${strength.color}`} />
            <span className={`text-sm font-medium ${strength.color}`}>
              {strength.label}
            </span>
          </div>
          <div className="space-y-1 text-sm">
            <p className="text-gray-600 dark:text-gray-400">
              Correlation: <span className="font-semibold text-gray-900 dark:text-white">{value.toFixed(3)}</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Strength: <span className="font-semibold text-gray-900 dark:text-white">
                {Math.abs(value) > 0.7 ? "Strong" : Math.abs(value) > 0.3 ? "Moderate" : "Weak"}
              </span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom bar shape with rounded corners
  const CustomBar = (props) => {
    const { x, y, width, height, value } = props;
    const isPositive = value >= 0;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={getColor(value)}
          rx={4} // Rounded corners
          className="transition-all hover:opacity-80"
        />
        {/* Value label inside bar for better readability */}
        {Math.abs(width) > 40 && (
          <text
            x={isPositive ? x + width - 25 : x + 25}
            y={y + height / 2}
            textAnchor={isPositive ? "end" : "start"}
            fill="white"
            fontSize={12}
            fontWeight="600"
            dy=".3em"
          >
            {value.toFixed(2)}
          </text>
        )}
      </g>
    );
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
      >
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-500 dark:text-gray-400">Loading correlation data...</p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
      >
        <div className="text-center py-12">
          <FiBarChart2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-lg">No correlation data available</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
            Correlation analysis will appear here once data is processed
          </p>
        </div>
      </motion.div>
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
            <FiTrendingUp className="w-6 h-6 text-indigo-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Correlation Analysis
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Relationship strength between metrics and outcomes
            </p>
          </div>
        </div>
      </div>

      {/* Correlation Legend */}
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-200 dark:border-gray-600">
        <div className="flex items-center space-x-2 mb-3">
          <FiInfo className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Correlation Strength Guide</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-green-500"></div>
            <span className="text-gray-600 dark:text-gray-400">Strong Positive (0.7+)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-amber-500"></div>
            <span className="text-gray-600 dark:text-gray-400">Moderate Positive (0.3-0.7)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-orange-500"></div>
            <span className="text-gray-600 dark:text-gray-400">Weak Positive (0-0.3)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-red-500"></div>
            <span className="text-gray-600 dark:text-gray-400">Weak Negative (-0.3-0)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-red-600"></div>
            <span className="text-gray-600 dark:text-gray-400">Moderate Negative (-0.7-0.3)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-red-800"></div>
            <span className="text-gray-600 dark:text-gray-400">Strong Negative (-1-0.7)</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 150, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E5E7EB"
              strokeOpacity={0.3}
              horizontal={false}
            />
            <XAxis
              type="number"
              domain={[-1, 1]}
              tick={{ fill: '#6B7280' }}
              tickCount={9}
              label={{
                value: "Correlation Coefficient",
                position: "insideBottom",
                offset: -5,
                style: { fill: '#6B7280' }
              }}
            />
            <YAxis
              type="category"
              dataKey="metric"
              tick={{ fill: '#6B7280', fontSize: 12 }}
              width={140}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              dataKey="score"
              name="Correlation Score"
              barSize={24}
              shape={<CustomBar />}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getColor(entry.score)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Statistics */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-200">
              {data.filter(d => d.score > 0.7).length}
            </div>
            <div className="text-sm text-blue-700 dark:text-blue-400">Strong Correlations</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-200">
              {data.filter(d => Math.abs(d.score) > 0.5).length}
            </div>
            <div className="text-sm text-blue-700 dark:text-blue-400">
              Significant (|r| &gt; 0.5)
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-200">
              {data.filter(d => d.score > 0).length}
            </div>
            <div className="text-sm text-blue-700 dark:text-blue-400">Positive</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-200">
              {data.filter(d => d.score < 0).length}
            </div>
            <div className="text-sm text-blue-700 dark:text-blue-400">Negative</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CorrelationChart;