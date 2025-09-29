import { useState, useMemo } from "react";
import {
    LineChart, Line,
    BarChart, Bar,
    XAxis, YAxis,
    Tooltip, Legend,
    ResponsiveContainer,
    CartesianGrid,
    Cell
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiTrendingUp,
    FiBarChart2,
    FiMap,
    FiFilter,
    FiX,
    FiGlobe,
    FiBriefcase,
    FiCalendar,
    FiUsers,
    FiAward
} from "react-icons/fi";

const JobTrends = ({ data, loading }) => {
    const [view, setView] = useState("line");
    const [selectedJob, setSelectedJob] = useState("");
    const [selectedYear, setSelectedYear] = useState("");

    // Transform nested JSON data to flattened format
    const flattenedData = useMemo(() => {
        if (!data || typeof data !== 'object') return [];

        const flattened = [];

        Object.entries(data).forEach(([region, jobs]) => {
            Object.entries(jobs).forEach(([jobTitle, years]) => {
                Object.entries(years).forEach(([year, count]) => {
                    flattened.push({
                        region,
                        job: jobTitle,
                        year: parseInt(year),
                        count: parseInt(count)
                    });
                });
            });
        });

        return flattened;
    }, [data]);

    // Extract unique jobs and years
    const jobs = useMemo(() => [...new Set(flattenedData.map(d => d.job))], [flattenedData]);
    const years = useMemo(() => [...new Set(flattenedData.map(d => d.year))].sort(), [flattenedData]);

    // Aggregate data for visualization
    const aggregatedData = useMemo(() => {
        let filtered = flattenedData;

        // Apply filters
        if (selectedJob) {
            filtered = filtered.filter(d => d.job === selectedJob);
        }
        if (selectedYear) {
            filtered = filtered.filter(d => d.year === parseInt(selectedYear));
        }

        // Group by region and sum counts
        const grouped = {};
        filtered.forEach(d => {
            const key = d.region;
            if (!grouped[key]) {
                grouped[key] = {
                    region: d.region,
                    count: 0,
                    jobs: new Set()
                };
            }
            grouped[key].count += d.count;
            grouped[key].jobs.add(d.job);
        });

        return Object.values(grouped).map(item => ({
            ...item,
            jobCount: item.jobs.size,
            jobs: undefined // Remove jobs set from final data
        }));
    }, [flattenedData, selectedJob, selectedYear]);

    // Top 5 jobs per region (for default view)
    const topJobsByRegion = useMemo(() => {
        if (selectedJob || selectedYear) return aggregatedData;

        const regionJobTotals = {};

        // Calculate total count per job per region
        flattenedData.forEach(d => {
            const key = `${d.region}-${d.job}`;
            if (!regionJobTotals[key]) {
                regionJobTotals[key] = {
                    region: d.region,
                    job: d.job,
                    count: 0
                };
            }
            regionJobTotals[key].count += d.count;
        });

        // Group by region and get top 5 jobs
        const byRegion = {};
        Object.values(regionJobTotals).forEach(item => {
            if (!byRegion[item.region]) byRegion[item.region] = [];
            byRegion[item.region].push(item);
        });

        // Get top 5 jobs per region and flatten
        const topJobs = [];
        Object.entries(byRegion).forEach(([region, jobs]) => {
            const top5 = jobs
                .sort((a, b) => b.count - a.count)
                .slice(0, 5);
            topJobs.push(...top5);
        });

        // Group by region for chart display
        const chartData = {};
        topJobs.forEach(item => {
            if (!chartData[item.region]) {
                chartData[item.region] = {
                    region: item.region,
                    count: 0
                };
            }
            chartData[item.region].count += item.count;
        });

        return Object.values(chartData);
    }, [flattenedData, selectedJob, selectedYear]);

    // Choose which data to display
    const displayData = selectedJob || selectedYear ? aggregatedData : topJobsByRegion;

    // Color palette
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'];

    // Custom tooltip component
    const CustomTooltip = ({ active, payload, label }) => {
        if (!active || !payload || !payload.length) return null;

        return (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <p className="font-semibold text-gray-900 dark:text-white mb-2">{label}</p>
                {payload.map((item, i) => (
                    <div key={i} className="flex items-center justify-between space-x-4 text-sm">
                        <span className="text-gray-600 dark:text-gray-400">{item.name}:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{item.value}</span>
                    </div>
                ))}
            </div>
        );
    };

    // Show loading / empty states
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
                        <p className="text-gray-500 dark:text-gray-400">Loading job trends data...</p>
                    </div>
                </div>
            </motion.div>
        );
    }

    if (!flattenedData.length) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
            >
                <div className="text-center py-12">
                    <FiBriefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 text-lg">No job trend data available</p>
                    <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
                        Job trend data will appear here once available
                    </p>
                </div>
            </motion.div>
        );
    }

    const totalJobs = flattenedData.reduce((sum, d) => sum + d.count, 0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 my-5"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                        <FiTrendingUp className="w-6 h-6 text-indigo-500" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Regional Job Trends
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Employment distribution across regions and time
                        </p>
                    </div>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Regions</p>
                            <p className="text-2xl font-bold text-blue-900 dark:text-blue-200 mt-1">
                                {Object.keys(data || {}).length}
                            </p>
                        </div>
                        <FiGlobe className="w-8 h-8 text-blue-500" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-green-800 dark:text-green-300">Job Types</p>
                            <p className="text-2xl font-bold text-green-900 dark:text-green-200 mt-1">
                                {jobs.length}
                            </p>
                        </div>
                        <FiBriefcase className="w-8 h-8 text-green-500" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-purple-800 dark:text-purple-300">Total Jobs</p>
                            <p className="text-2xl font-bold text-purple-900 dark:text-purple-200 mt-1">
                                {totalJobs.toLocaleString()}
                            </p>
                        </div>
                        <FiUsers className="w-8 h-8 text-purple-500" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-orange-800 dark:text-orange-300">Years Covered</p>
                            <p className="text-2xl font-bold text-orange-900 dark:text-orange-200 mt-1">
                                {years.length}
                            </p>
                        </div>
                        <FiCalendar className="w-8 h-8 text-orange-500" />
                    </div>
                </motion.div>
            </div>

            {/* Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-200 dark:border-gray-600">
                <div className="flex flex-1 flex-wrap gap-3">
                    {/* Job dropdown */}
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Filter by Job
                        </label>
                        <select
                            value={selectedJob}
                            onChange={(e) => setSelectedJob(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        >
                            <option value="">All Jobs</option>
                            {jobs.sort().map(job => (
                                <option key={job} value={job}>{job}</option>
                            ))}
                        </select>
                    </div>

                    {/* Year dropdown */}
                    <div className="flex-1 min-w-[150px]">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Filter by Year
                        </label>
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        >
                            <option value="">All Years</option>
                            {years.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Clear filters button */}
                <AnimatePresence>
                    {(selectedJob || selectedYear) && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                setSelectedJob("");
                                setSelectedYear("");
                            }}
                            className="flex items-center space-x-2 px-4 py-3 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors self-end lg:self-auto"
                        >
                            <FiX className="w-4 h-4" />
                            <span>Clear Filters</span>
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* View tabs */}
                <div className="flex gap-2 self-end lg:self-auto">
                    {[
                        { key: "line", icon: FiTrendingUp, label: "Line" },
                        { key: "bar", icon: FiBarChart2, label: "Bar" },
                        { key: "heatmap", icon: FiMap, label: "Grid" }
                    ].map(({ key, icon: Icon, label }) => (
                        <motion.button
                            key={key}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setView(key)}
                            className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${view === key
                                    ? "bg-blue-600 text-white shadow-sm"
                                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            <span>{label}</span>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Chart area */}
            <div className="w-full h-96 mb-4">
                {view === "line" && (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={displayData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.3} />
                            <XAxis
                                dataKey="region"
                                angle={-45}
                                textAnchor="end"
                                height={80}
                                interval={0}
                                tick={{ fill: '#6B7280', fontSize: 12 }}
                            />
                            <YAxis
                                tick={{ fill: '#6B7280' }}
                                label={{
                                    value: "Job Count",
                                    angle: -90,
                                    position: "insideLeft",
                                    offset: -10,
                                    style: { textAnchor: 'middle', fill: '#6B7280' }
                                }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="count"
                                stroke="#3B82F6"
                                strokeWidth={3}
                                dot={{
                                    fill: '#3B82F6',
                                    strokeWidth: 2,
                                    r: 5,
                                    className: "transition-all hover:r-6"
                                }}
                                activeDot={{ r: 8, fill: '#3B82F6' }}
                                className="transition-all"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                )}

                {view === "bar" && (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={displayData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.3} />
                            <XAxis
                                dataKey="region"
                                angle={-45}
                                textAnchor="end"
                                height={80}
                                interval={0}
                                tick={{ fill: '#6B7280', fontSize: 12 }}
                            />
                            <YAxis
                                tick={{ fill: '#6B7280' }}
                                label={{
                                    value: "Job Count",
                                    angle: -90,
                                    position: "insideLeft",
                                    offset: -10,
                                    style: { textAnchor: 'middle', fill: '#6B7280' }
                                }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar
                                dataKey="count"
                                name="Job Count"
                                radius={[4, 4, 0, 0]}
                            >
                                {displayData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={colors[index % colors.length]}
                                        className="transition-opacity hover:opacity-80"
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                )}

                {view === "heatmap" && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 h-full overflow-y-auto p-2">
                        {displayData.map((d, i) => {
                            const maxCount = Math.max(...displayData.map(item => item.count));
                            const intensity = Math.min(0.3 + (d.count / maxCount) * 0.7, 1);

                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex flex-col items-center justify-center p-4 rounded-xl text-white min-h-24 shadow-sm hover:shadow-md transition-all cursor-pointer"
                                    style={{
                                        backgroundColor: `rgba(59, 130, 246, ${intensity})`,
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <span className="text-xs font-medium mb-2 text-center leading-tight">{d.region}</span>
                                    <span className="text-2xl font-bold mb-1">{d.count}</span>
                                    <span className="text-xs opacity-90">jobs</span>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Current view info */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-200 dark:border-gray-600"
            >
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <FiFilter className="w-4 h-4" />
                    <span>
                        {!selectedJob && !selectedYear && "Showing top 5 jobs per region aggregated"}
                        {selectedJob && !selectedYear && `Showing "${selectedJob}" across all years`}
                        {!selectedJob && selectedYear && `Showing all jobs for ${selectedYear}`}
                        {selectedJob && selectedYear && `Showing "${selectedJob}" for ${selectedYear}`}
                    </span>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default JobTrends;