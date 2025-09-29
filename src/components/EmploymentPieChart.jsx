import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import {
    FiTrendingUp,
    FiUsers,
    FiBriefcase,
    FiUserCheck,
    FiUserX,
    FiCalendar,
    FiPieChart
} from 'react-icons/fi';

const EmploymentPieChart = ({ data }) => {
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

    // Current
    const employed = data?.current?.summary?.employedAccounts || 0;
    const freelance = data?.current?.summary?.freelanceAccounts || 0;
    const unemployed = data?.current?.summary?.unemployedAccounts || 0;

    // Previous
    const prevEmployed = data?.previous?.summary?.employedAccounts || 0;
    const prevFreelance = data?.previous?.summary?.freelanceAccounts || 0;
    const prevUnemployed = data?.previous?.summary?.unemployedAccounts || 0;

    // Totals for percentages
    const currentTotal = employed + freelance + unemployed;
    const previousTotal = prevEmployed + prevFreelance + prevUnemployed;

    // Chart data with percentages
    const currentData = [
        { name: 'Employed', value: employed, percentage: currentTotal > 0 ? (employed / currentTotal * 100).toFixed(1) : 0 },
        { name: 'Freelance', value: freelance, percentage: currentTotal > 0 ? (freelance / currentTotal * 100).toFixed(1) : 0 },
        { name: 'Unemployed', value: unemployed, percentage: currentTotal > 0 ? (unemployed / currentTotal * 100).toFixed(1) : 0 },
    ];

    const previousData = [
        { name: 'Employed', value: prevEmployed, percentage: previousTotal > 0 ? (prevEmployed / previousTotal * 100).toFixed(1) : 0 },
        { name: 'Freelance', value: prevFreelance, percentage: previousTotal > 0 ? (prevFreelance / previousTotal * 100).toFixed(1) : 0 },
        { name: 'Unemployed', value: prevUnemployed, percentage: previousTotal > 0 ? (prevUnemployed / previousTotal * 100).toFixed(1) : 0 },
    ];

    const COLORS = {
        Employed: '#10B981',   // green-500
        Freelance: '#3B82F6',  // blue-500
        Unemployed: '#EF4444', // red-500
    };

    const ICONS = {
        Employed: <FiUserCheck className="w-4 h-4" />,
        Freelance: <FiBriefcase className="w-4 h-4" />,
        Unemployed: <FiUserX className="w-4 h-4" />,
    };

    // Custom Tooltip
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                    <p className="font-semibold text-gray-900 dark:text-white">{data.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {data.value} alumni ({data.percentage}%)
                    </p>
                </div>
            );
        }
        return null;
    };

    // Custom Label
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percentage }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                className="text-sm font-semibold"
            >
                {percentage}%
            </text>
        );
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 my-5"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                        <FiPieChart className="w-6 h-6 text-indigo-500" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Employment Status Analytics
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Current vs previous period comparison
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <FiCalendar className="w-4 h-4" />
                    <span>Updated just now</span>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-green-800 dark:text-green-300">Employed</p>
                            <p className="text-2xl font-bold text-green-900 dark:text-green-200 mt-1">
                                {employed}
                            </p>
                            <p className="text-xs text-green-700 dark:text-green-400 mt-1">
                                +{employed - prevEmployed} from previous
                            </p>
                        </div>
                        <FiUserCheck className="w-8 h-8 text-green-500" />
                    </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Freelance</p>
                            <p className="text-2xl font-bold text-blue-900 dark:text-blue-200 mt-1">
                                {freelance}
                            </p>
                            <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                                {freelance - prevFreelance >= 0 ? '+' : ''}{freelance - prevFreelance} from previous
                            </p>
                        </div>
                        <FiBriefcase className="w-8 h-8 text-blue-500" />
                    </div>
                </div>

                <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-red-800 dark:text-red-300">Unemployed</p>
                            <p className="text-2xl font-bold text-red-900 dark:text-red-200 mt-1">
                                {unemployed}
                            </p>
                            <p className="text-xs text-red-700 dark:text-red-400 mt-1">
                                {unemployed - prevUnemployed >= 0 ? '+' : ''}{unemployed - prevUnemployed} from previous
                            </p>
                        </div>
                        <FiUserX className="w-8 h-8 text-red-500" />
                    </div>
                </div>
            </div>

            {/* Two Pie Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Current Period */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                >
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <FiTrendingUp className="w-5 h-5 text-green-500" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Current Period</h3>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <FiCalendar className="w-4 h-4" />
                        <span>{currentRangeText}</span>
                    </div>

                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={currentData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                innerRadius={60}
                                paddingAngle={2}
                                label={renderCustomizedLabel}
                                labelLine={false}
                            >
                                {currentData.map((entry, index) => (
                                    <Cell
                                        key={`current-${index}`}
                                        fill={COLORS[entry.name]}
                                        className="transition-opacity hover:opacity-80 cursor-pointer"
                                    />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Legend */}
                    <div className="flex justify-center space-x-6 mt-4">
                        {currentData.map((entry, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: COLORS[entry.name] }}
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {entry.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Previous Period */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center"
                >
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <FiCalendar className="w-5 h-5 text-blue-500" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Previous Period</h3>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <FiCalendar className="w-4 h-4" />
                        <span>{previousRangeText}</span>
                    </div>

                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={previousData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                innerRadius={60}
                                paddingAngle={2}
                                label={renderCustomizedLabel}
                                labelLine={false}
                            >
                                {previousData.map((entry, index) => (
                                    <Cell
                                        key={`previous-${index}`}
                                        fill={COLORS[entry.name]}
                                        className="transition-opacity hover:opacity-80 cursor-pointer"
                                    />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Legend */}
                    <div className="flex justify-center space-x-6 mt-4">
                        {previousData.map((entry, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: COLORS[entry.name] }}
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {entry.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Context Note */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-200 dark:border-gray-600"
            >
                <div className="flex items-start space-x-3">
                    <FiUsers className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-medium text-gray-900 dark:text-white">Current period</span> refers to{' '}
                            <span className="font-medium">{currentRangeText}</span>.{' '}
                            <span className="font-medium text-gray-900 dark:text-white">Previous period</span> refers to{' '}
                            <span className="font-medium">{previousRangeText}</span>.
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                            Total alumni tracked: {currentTotal} (current) • {previousTotal} (previous)
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default EmploymentPieChart;