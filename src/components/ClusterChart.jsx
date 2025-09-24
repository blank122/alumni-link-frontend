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

// Color mapping (your existing code)
const CLUSTER_COLORS = {
    "Cluster A: Highly Certified Professionals": "#4f46e5",
    "Cluster B: Early-Career Alumni": "#10b981",
    "Cluster C: Experienced but Less Certified": "#f59e0b",
    "Experienced Alumni (5+ work experienced years)": "#4f46e5",
    "Masters Degree Holder": "#10b981",
    "Early Career Alumni (<1 work experienced year)": "#f59e0b",
    "Mid-Level Alumni (2-5 years)": "#06b6d4",
    "Cluster A: Working Abroad": "#06b6d4",
    "Cluster B: Working in the Philippines": "#8b5cf6",
    "Cluster A: NCR": "#1f77b4",       // Blue
    "Cluster B: Luzon": "#ff7f0e",     // Orange
    "Cluster C: Visayas": "#2ca02c",   // Green
    "Cluster D: Mindanao": "#d62728",  // Red
    "Cluster E: Outside Philippines": "#9467bd", // Purple
};

// Label generator (your existing code)
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

const ClusterChart = ({ data, clusteringType = "kmeans-profile", chartType = "bar" }) => {
    const clusteredData = Array.isArray(data) ? data : data?.clustered_data || [];

    if (!clusteredData.length) {
        return <p>No clustering data available.</p>;
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
            fill: CLUSTER_COLORS[name] || "#8884d8"
        }));

    // For scatter plot - group data by cluster
    const scatterDataByCluster = sortedClusters.reduce((acc, cluster) => {
        acc[cluster.name] = {
            name: cluster.name,
            data: [{ x: sortedClusters.findIndex(c => c.name === cluster.name), y: cluster.count }],
            fill: cluster.fill
        };
        return acc;
    }, {});

    // For heatmap - group data by cluster
    const heatmapDataByCluster = sortedClusters.reduce((acc, cluster, index) => {
        acc[cluster.name] = {
            name: cluster.name,
            data: [{
                x: index % 3,
                y: Math.floor(index / 3),
                value: cluster.count,
                intensity: cluster.count / Math.max(...sortedClusters.map(c => c.count))
            }],
            fill: cluster.fill
        };
        return acc;
    }, {});


    const renderChart = () => {
        switch (chartType) {
            case "scatter":
                return (
                    <ResponsiveContainer width="100%" height={400}>
                        <ScatterChart
                            margin={{ top: 20, right: 20, bottom: 70, left: 70 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                type="number"
                                dataKey="x"
                                name="Cluster Index"
                                tick={false}
                                label={{ value: 'Clusters', position: 'insideBottom', offset: -10 }}
                            />
                            <YAxis
                                type="number"
                                dataKey="y"
                                name="Alumni Count"
                                label={{ value: 'Number of Alumni', angle: -90, position: 'insideLeft' }}
                            />
                            <Tooltip
                                cursor={{ strokeDasharray: "3 3" }}
                                formatter={(value, name, props) => {
                                    if (name === 'y') return [value, 'Alumni Count'];
                                    return [value, name];
                                }}
                                labelFormatter={(label, payload) => {
                                    if (payload && payload[0]) {
                                        return payload[0].payload.clusterName || '';
                                    }
                                    return '';
                                }}
                            />
                            <Legend />
                            {Object.entries(scatterDataByCluster).map(([clusterName, clusterData]) => (
                                <Scatter
                                    key={clusterName}
                                    name={clusterName}
                                    data={clusterData.data.map(item => ({
                                        ...item,
                                        clusterName: clusterName
                                    }))}
                                    fill={clusterData.fill}
                                    shape={(props) => {
                                        const { cx, cy, payload } = props;
                                        const size = Math.sqrt(payload.y) * 2 + 10;
                                        return (
                                            <circle
                                                cx={cx}
                                                cy={cy}
                                                r={size}
                                                fill={clusterData.fill}
                                                stroke="#fff"
                                                strokeWidth={2}
                                                opacity={0.8}
                                            />
                                        );
                                    }}
                                />
                            ))}
                        </ScatterChart>
                    </ResponsiveContainer>
                );

            case "heatmap":
                return (
                    <ResponsiveContainer width="100%" height={400}>
                        <ScatterChart
                            margin={{ top: 20, right: 20, bottom: 70, left: 70 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                type="number"
                                dataKey="x"
                                name="Column"
                                tick={false}
                                domain={[-0.5, 2.5]}
                                label={{ value: '', position: 'insideBottom' }}
                            />
                            <YAxis
                                type="number"
                                dataKey="y"
                                name="Row"
                                tick={false}
                                domain={[-0.5, Math.ceil(sortedClusters.length / 3) - 0.5]}
                                label={{ value: '', angle: -90, position: 'insideLeft' }}
                            />
                            <Tooltip
                                formatter={(value, name, props) => {
                                    if (name === 'value') return [value, 'Alumni Count'];
                                    return [value, name];
                                }}
                                labelFormatter={(label, payload) => {
                                    if (payload && payload[0]) {
                                        return payload[0].payload.clusterName || '';
                                    }
                                    return '';
                                }}
                            />
                            <Legend />
                            {Object.entries(heatmapDataByCluster).map(([clusterName, clusterData]) => (
                                <Scatter
                                    key={clusterName}
                                    name={clusterName}
                                    data={clusterData.data.map(item => ({
                                        ...item,
                                        clusterName: clusterName
                                    }))}
                                    fill={clusterData.fill}
                                    shape={(props) => {
                                        const { cx, cy, payload } = props;
                                        const size = 40;
                                        return (
                                            <rect
                                                x={cx - size / 2}
                                                y={cy - size / 2}
                                                width={size}
                                                height={size}
                                                fill={clusterData.fill}
                                                fillOpacity={payload.intensity * 0.7 + 0.3}
                                                stroke="#fff"
                                                strokeWidth={2}
                                                rx={5}
                                            />
                                        );
                                    }}
                                />
                            ))}
                        </ScatterChart>
                    </ResponsiveContainer>
                );

            case "pie":
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Tooltip
                                formatter={(value, name, props) => [
                                    value,
                                    `${name} (${props.payload.percentage ||
                                    (value / clusteredData.length * 100).toFixed(1) + '%'})`
                                ]}
                            />
                            <Legend />
                            <Pie
                                data={sortedClusters}
                                dataKey="count"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label={({ name, percent }) =>
                                    `${name}: ${(percent * 100).toFixed(1)}%`
                                }
                            >
                                {sortedClusters.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                );

            case "line":
                const lineChartData = sortedClusters.map((cluster, index) => ({
                    ...cluster,
                    rank: index + 1,
                    percentage: (cluster.count / clusteredData.length * 100).toFixed(1) + '%'
                }));

                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={lineChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="name"
                                tick={{ angle: -45, textAnchor: "end" }}
                                height={70}
                            />
                            <YAxis allowDecimals={false} />
                            <Tooltip
                                formatter={(value, name, props) => [
                                    value,
                                    `${props.payload.name} (Rank ${props.payload.rank})`
                                ]}
                                labelFormatter={() => "Cluster"}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="count"
                                stroke="#8884d8"
                                strokeWidth={2}
                                dot={({ cx, cy, payload }) => (
                                    <circle
                                        cx={cx}
                                        cy={cy}
                                        r={6}
                                        fill={CLUSTER_COLORS[payload.name] || "#8884d8"}
                                        stroke="#fff"
                                        strokeWidth={2}
                                    />
                                )}
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                );

            case "bar":
            default:
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={sortedClusters}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="name"
                                tick={{ angle: 0, textAnchor: "middle" }}
                                interval={0}
                                height={50}
                            />
                            <YAxis allowDecimals={false} />
                            <Tooltip
                                formatter={(value, name, props) => [
                                    value,
                                    `${props.payload.name} (${(
                                        (value / clusteredData.length) *
                                        100
                                    ).toFixed(1)}%)`
                                ]}
                            />
                            <Legend />
                            <Bar dataKey="count" name="Number of Alumni">
                                {sortedClusters.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                );
        }
    };

    return (
        <div>
            <h3>{chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart</h3>
            {renderChart()}
        </div>
    );
};

export default ClusterChart;