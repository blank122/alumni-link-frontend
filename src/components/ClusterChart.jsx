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
    Cell
} from "recharts";

// Color mapping
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

    // For line chart - create data points sorted by count
    const lineChartData = sortedClusters.map((cluster, index) => ({
        ...cluster,
        // Use index as x-axis value to maintain order
        rank: index + 1,
        // Add percentage if needed
        percentage: (cluster.count / clusteredData.length * 100).toFixed(1) + '%'
    }));

    const renderChart = () => {
        switch (chartType) {
            case "pie":
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Tooltip 
                                formatter={(value, name, props) => [
                                    value, 
                                    `${name} (${props.payload.percentage || 
                                        (value/clusteredData.length*100).toFixed(1)+'%'})`
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
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                            >
                                {sortedClusters.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                );
            case "line":
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={lineChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                                dataKey="name" 
                                tick={{ angle: -45, textAnchor: 'end' }}
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
                                dot={({ payload }) => (
                                    <circle
                                        cx={payload.cx}
                                        cy={payload.cy}
                                        r={6}
                                        fill={CLUSTER_COLORS[payload.name] || "#8884d8"}
                                        stroke="#fff"
                                        strokeWidth={2}
                                    />
                                )}
                                activeDot={{ r: 8 }}
                                label={({ x, y, value }) => (
                                    <text
                                        x={x}
                                        y={y - 10}
                                        fill={CLUSTER_COLORS[lineChartData.find(d => d.count === value)?.name] || "#8884d8"}
                                        textAnchor="middle"
                                        fontSize={12}
                                    >
                                        {value}
                                    </text>
                                )}
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
                                tick={{ angle: -45, textAnchor: 'end' }}
                                height={70}
                            />
                            <YAxis allowDecimals={false} />
                            <Tooltip 
                                formatter={(value, name, props) => [
                                    value, 
                                    `${props.payload.name} (${(value/clusteredData.length*100).toFixed(1)}%)`
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

    return renderChart();
};

export default ClusterChart;
