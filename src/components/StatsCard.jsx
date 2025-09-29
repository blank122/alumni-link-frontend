import { motion } from 'framer-motion';
import ChartLoading from "../components/ChartLoading";

const StatsCard = ({
  icon: Icon,
  title,
  value,
  isLoading,
  description,
  trend,
  trendValue,
  bgColor = 'bg-white',
  iconBgColor = 'bg-blue-50',
  iconColor = 'text-blue-500',
  textColor = 'text-gray-900',
  valueColor = 'text-gray-900'
}) => {
  const getTrendColor = () => {
    if (!trend) return 'text-gray-500';
    return trend === 'up' ? 'text-green-500' : 'text-red-500';
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    return trend === 'up' ? '↗' : '↘';
  };

  return (
    <motion.div
      className={`p-6 ${bgColor} dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 transition-all duration-300 overflow-hidden relative group cursor-pointer`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -4,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Background gradient effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/5 dark:to-gray-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 ${iconBgColor} dark:${iconBgColor.replace('bg-', 'bg-').replace('-50', '-900/20')} rounded-xl`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>

          {/* Trend Indicator */}
          {trend && (
            <div className={`flex items-center space-x-1 text-sm font-medium ${getTrendColor()}`}>
              <span className="text-xs">{getTrendIcon()}</span>
              <span>{trendValue}</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          {/* Title */}
          <h3 className={`text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide ${textColor}`}>
            {title}
          </h3>

          {/* Value */}
          <div className="min-h-12 flex items-center">
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                <span className="text-sm text-gray-500">Loading...</span>
              </div>
            ) : (
              <p className={`text-3xl font-bold ${valueColor} dark:text-white`}>
                {value?.toLocaleString() ?? 0}
              </p>
            )}
          </div>

          {/* Description */}
          {description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
              {description}
            </p>
          )}
        </div>

        {/* Bottom border accent */}
        <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-500" />
      </div>
    </motion.div>
  );
};

// Pre-styled variants for common use cases
export const StatsCardVariants = {
  primary: {
    bgColor: 'bg-white dark:bg-gray-800',
    iconBgColor: 'bg-blue-50',
    iconColor: 'text-blue-500',
    textColor: 'text-gray-600',
    valueColor: 'text-gray-900'
  },
  success: {
    bgColor: 'bg-white dark:bg-gray-800',
    iconBgColor: 'bg-green-50',
    iconColor: 'text-green-500',
    textColor: 'text-gray-600',
    valueColor: 'text-gray-900'
  },
  warning: {
    bgColor: 'bg-white dark:bg-gray-800',
    iconBgColor: 'bg-orange-50',
    iconColor: 'text-orange-500',
    textColor: 'text-gray-600',
    valueColor: 'text-gray-900'
  },
  danger: {
    bgColor: 'bg-white dark:bg-gray-800',
    iconBgColor: 'bg-red-50',
    iconColor: 'text-red-500',
    textColor: 'text-gray-600',
    valueColor: 'text-gray-900'
  },
  gradient: {
    bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20',
    iconBgColor: 'bg-white dark:bg-gray-800',
    iconColor: 'text-blue-500',
    textColor: 'text-gray-600',
    valueColor: 'text-gray-900'
  }
};

export default StatsCard;