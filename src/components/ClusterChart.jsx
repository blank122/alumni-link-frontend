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

    const clusterCount = clusteredData.reduce((acc, curr) => {
        const label = getClusterLabel(clusteringType, curr.kmeans_cluster);
        acc[label] = (acc[label] || 0) + 1;
        return acc;
    }, {});

    const chartData = Object.entries(clusterCount).map(([name, count]) => ({
        name,
        count,
        fill: CLUSTER_COLORS[name] || "#8884d8"
    }));

    const renderChart = () => {
        switch (chartType) {
            case "pie":
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Tooltip />
                            <Legend />
                            <Pie
                                data={chartData}
                                dataKey="count"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                );
            case "line":
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="count" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                );
            case "bar":
            default:
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" name="Number of Alumni">
                                {chartData.map((entry, index) => (
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
