import React from 'react';
import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Legend,
    Cell,
    ScatterChart,
    Scatter,
    ZAxis
} from "recharts";
import { motion } from 'framer-motion';
import {
    FiBarChart2,
    FiPieChart,
    FiTrendingUp,
    FiMap,
    FiUsers,
    FiAward,
    FiGlobe
} from 'react-icons/fi';

// Color mapping with Tailwind colors
const CLUSTER_COLORS = {
    "Cluster A: Highly Certified Professionals": "#3B82F6", // blue-500
    "Cluster B: Early-Career Alumni": "#10B981", // green-500
    "Cluster C: Experienced but Less Certified": "#F59E0B", // amber-500
    "Experienced Alumni (5+ work experienced years)": "#8B5CF6", // violet-500
    "Masters Degree Holder": "#06B6D4", // cyan-500
    "Early Career Alumni (<1 work experienced year)": "#EF4444", // red-500
    "Mid-Level Alumni (2-5 years)": "#F97316", // orange-500
    "Cluster A: Working Abroad": "#6366F1", // indigo-500
    "Cluster B: Working in the Philippines": "#84CC16", // lime-500
    "Cluster A: NCR": "#3B82F6", // blue-500
    "Cluster B: Luzon": "#F59E0B", // amber-500
    "Cluster C: Visayas": "#10B981", // green-500
    "Cluster D: Mindanao": "#EF4444", // red-500
    "Cluster E: Outside Philippines": "#8B5CF6", // violet-500
};

// Label generator
const getClusterLabel = (clusteringType, clusterNumber) => {
    switch (clusteringType) {
        case "kmeans-profile":
            return [
                "Experienced Alumni (5+ work experienced years)",
                "Masters Degree Holder",
                "Early Career Alumni (<1 work experienced year)",
                "Mid-Level Alumni (2-5 years)"
            ][clusterNumber] ?? `Cluster ${clusterNumber}`;
        case "kmeans-location":
            return [
                "Cluster A: Working Abroad",
                "Cluster B: Working in the Philippines"
            ][clusterNumber] ?? `Cluster ${clusterNumber}`;
        case "kmeans-certificate":
            return [
                "Cluster A: Highly Certified Professionals",
                "Cluster B: Early-Career Alumni",
                "Cluster C: Experienced but Less Certified"
            ][clusterNumber] ?? `Cluster ${clusterNumber}`;
        case "kmeans-ph-regions":
            return [
                "Cluster A: NCR",
                "Cluster B: Luzon",
                "Cluster C: Visayas",
                "Cluster D: Mindanao",
                "Cluster E: Outside Philippines"
            ][clusterNumber] ?? `Cluster ${clusterNumber}`;
        default:
            return `Cluster ${clusterNumber}`;
    }
};

const getChartIcon = (chartType) => {
    switch (chartType) {
        case "bar": return FiBarChart2;
        case "pie": return FiPieChart;
        case "line": return FiTrendingUp;
        case "scatter": return FiMap;
        case "heatmap": return FiUsers;
        default: return FiBarChart2;
    }
};

const getChartTitle = (chartType, clusteringType) => {
    const baseTitles = {
        "bar": "Distribution",
        "pie": "Composition",
        "line": "Trends",
        "scatter": "Overview",
        "heatmap": "Density"
    };

    const typeTitles = {
        "kmeans-profile": "Alumni Profile",
        "kmeans-location": "Location",
        "kmeans-certificate": "Certification",
        "kmeans-ph-regions": "Philippine Regions"
    };

    return `${typeTitles[clusteringType] || 'Cluster'} ${baseTitles[chartType] || 'Analysis'}`;
};

const ClusterChart = ({ data, clusteringType = "kmeans-profile", chartType = "bar" }) => {
    const clusteredData = Array.isArray(data) ? data : data?.clustered_data || [];

    if (!clusteredData.length) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                <div className="text-center py-12">
                    <FiUsers className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 text-lg">No clustering data available</p>
                    <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
                        Cluster data will appear here once available
                    </p>
                </div>
            </div>
        );
    }

    // Calculate cluster counts
    const clusterCount = clusteredData.reduce((acc, curr) => {
        const label = getClusterLabel(clusteringType, curr.kmeans_cluster);
        acc[label] = (acc[label] || 0) + 1;
        return acc;
    }, {});

    // Sort clusters by count (descending)
    const sortedClusters = Object.entries(clusterCount)
        .sort((a, b) => b[1] - a[1])
        .map(([name, count]) => ({
            name,
            count,
            percentage: (count / clusteredData.length * 100).toFixed(1),
            fill: CLUSTER_COLORS[name] || "#6B7280"
        }));

    const truncateLabel = (label, maxLength = 20) => {
        if (!label) return "";
        return label.length > maxLength ? label.substring(0, maxLength) + "…" : label;
    };

    // Custom Tooltip Component
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <p className="font-semibold text-gray-900 dark:text-white mb-2">
                        {data.name || label}
                    </p>
                    <div className="space-y-1 text-sm">
                        <p className="text-gray-600 dark:text-gray-400">
                            Alumni Count: <span className="font-semibold text-gray-900 dark:text-white">{data.count || data.value}</span>
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                            Percentage: <span className="font-semibold text-gray-900 dark:text-white">{data.percentage || ((data.count / clusteredData.length) * 100).toFixed(1)}%</span>
                        </p>
                    </div>
                </div>
            );
        }
        return null;
    };

    const renderChart = () => {
        const ChartIcon = getChartIcon(chartType);

        switch (chartType) {
            case "scatter":
                const scatterData = sortedClusters.map((cluster, index) => ({
                    x: index,
                    y: cluster.count,
                    z: cluster.count,
                    ...cluster
                }));

                return (
                    <ResponsiveContainer width="100%" height={400}>
                        <ScatterChart data={scatterData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.3} />
                            <XAxis
                                dataKey="x"
                                tick={false}
                                label={{ value: 'Clusters', position: 'insideBottom', offset: -5, style: { fill: '#6B7280' } }}
                            />
                            <YAxis
                                dataKey="y"
                                label={{ value: 'Alumni Count', angle: -90, position: 'insideLeft', style: { fill: '#6B7280' } }}
                                tick={{ fill: '#6B7280' }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Scatter
                                dataKey="y"
                                fill="#3B82F6"
                                shape={(props) => {
                                    const { cx, cy, payload } = props;
                                    const size = Math.sqrt(payload.y) * 0.5 + 20;
                                    return (
                                        <circle
                                            cx={cx}
                                            cy={cy}
                                            r={size}
                                            fill={payload.fill}
                                            stroke="#fff"
                                            strokeWidth={2}
                                            opacity={0.8}
                                            className="transition-all hover:r-8"
                                        />
                                    );
                                }}
                            />
                        </ScatterChart>
                    </ResponsiveContainer>
                );

            case "pie":
                return (
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={sortedClusters}
                                    dataKey="count"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={120}
                                    innerRadius={60}
                                    paddingAngle={2}
                                    label={({ name, percent }) =>
                                        `${truncateLabel(name, 12)}: ${(percent * 100).toFixed(0)}%`
                                    }
                                    labelLine={false}
                                >
                                    {sortedClusters.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.fill}
                                            className="transition-opacity hover:opacity-80"
                                        />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                                <Legend
                                    wrapperStyle={{
                                        fontSize: '14px',
                                        paddingTop: '20px'
                                    }}
                                    formatter={(value) => truncateLabel(value, 18)}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                );

            case "line":
                const lineChartData = sortedClusters.map((cluster, index) => ({
                    ...cluster,
                    rank: index + 1
                }));

                return (
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={lineChartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.3} />
                            <XAxis
                                dataKey="name"
                                tick={{
                                    fill: '#6B7280',
                                    fontSize: 12,
                                    angle: -45,
                                    textAnchor: 'end'
                                }}
                                height={80}
                                interval={0}
                            />
                            <YAxis
                                allowDecimals={false}
                                tick={{ fill: '#6B7280' }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="count"
                                stroke="#3B82F6"
                                strokeWidth={3}
                                dot={({ cx, cy, payload }) => (
                                    <circle
                                        cx={cx}
                                        cy={cy}
                                        r={6}
                                        fill={payload.fill}
                                        stroke="#fff"
                                        strokeWidth={2}
                                        className="transition-all hover:r-8"
                                    />
                                )}
                                activeDot={{ r: 8, fill: '#3B82F6' }}
                                className="transition-all"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                );

            case "bar":
            default:
                return (
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={sortedClusters}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.3} />
                            <XAxis
                                dataKey="name"
                                tick={{
                                    fill: '#6B7280',
                                    fontSize: 12,
                                    angle: -45,
                                    textAnchor: 'end'
                                }}
                                height={80}
                                interval={0}
                            />
                            <YAxis
                                allowDecimals={false}
                                tick={{ fill: '#6B7280' }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar
                                dataKey="count"
                                name="Number of Alumni"
                                radius={[4, 4, 0, 0]}
                            >
                                {sortedClusters.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.fill}
                                        className="transition-opacity hover:opacity-80"
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                );
        }
    };

    const ChartIcon = getChartIcon(chartType);

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
                        <ChartIcon className="w-6 h-6 text-indigo-500" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {getChartTitle(chartType, clusteringType)}
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {sortedClusters.length} cluster{sortedClusters.length !== 1 ? 's' : ''} • {clusteredData.length} total alumni
                        </p>
                    </div>
                </div>
            </div>

            {/* Chart */}
            {renderChart()}

            {/* Cluster Legend */}
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-200 dark:border-gray-600">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Cluster Legend</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {sortedClusters.map((cluster, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                            <div
                                className="w-3 h-3 rounded-full flex-shrink-0"
                                style={{ backgroundColor: cluster.fill }}
                            />
                            <span className="text-gray-600 dark:text-gray-400 flex-1">
                                {truncateLabel(cluster.name, 25)}
                            </span>
                            <span className="font-semibold text-gray-900 dark:text-white">
                                {cluster.count}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default ClusterChart;