import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Legend
} from "recharts";

// Color mapping for clusters (you can customize these)
const CLUSTER_COLORS = {
    // For kmeans-certificate
    "Cluster A: Highly Certified Professionals": "#4f46e5",  // Indigo
    "Cluster B: Early-Career Alumni": "#10b981",           // Emerald
    "Cluster C: Experienced but Less Certified": "#f59e0b", // Amber

    // For kmeans-profile (optional)
    "Experienced Alumni (5+ work experienced years)": "#4f46e5",  // Indigo
    "Masters Degree Holder": "#10b981",           // Emerald
    "Early Career Alumni (<1 work experienced year)": "#f59e0b", // Amber
    "Mid-Level Alumni (2-5 years)": "#06b6d4",     // Cyan

    // For kmeans-location (optional)
    "Cluster A: Working in the Philippines": "#06b6d4",     // Cyan
    "Cluster B: Working Abroad": "#8b5cf6",                // Violet
};

// Dynamic label generator based on clustering type
const getClusterLabel = (clusteringType, clusterNumber) => {
    if (clusteringType === "kmeans-profile") {
        switch (clusterNumber) {
            case 0:
                return "Experienced Alumni (5+ work experienced years)";
            case 1:
                return "Masters Degree Holder";
            case 2:
                return "Early Career Alumni (<1 work experienced year)";
            case 3:
                return "Mid-Level Alumni (2-5 years)";
            default:
                return `Cluster ${clusterNumber}`;
        }
    }

    if (clusteringType === "kmeans-location") {
        switch (clusterNumber) {
            case 0:
                return "Cluster A: Working in the Philippines";
            case 1:
                return "Cluster B: Working Abroad";
            default:
                return `Cluster ${clusterNumber}`;
        }
    }

    if (clusteringType === "kmeans-certificate") {
        switch (clusterNumber) {
            case 0:
                return "Cluster A: Highly Certified Professionals";
            case 1:
                return "Cluster B: Early-Career Alumni";
            case 2:
                return "Cluster C: Experienced but Less Certified";
            default:
                return `Cluster ${clusterNumber}`;
        }
    }

    return `Cluster ${clusterNumber}`;
};

const ClusterChart = ({ data, clusteringType = "kmeans-profile" }) => {
    const clusteredData = Array.isArray(data) ? data : data?.clustered_data || [];

    if (!clusteredData.length) {
        return <p>No clustering data available.</p>;
    }

    // Group data by readable cluster labels
    const clusterCount = clusteredData.reduce((acc, curr) => {
        const label = getClusterLabel(clusteringType, curr.kmeans_cluster);
        acc[label] = (acc[label] || 0) + 1;
        return acc;
    }, {});

    // Convert to chart-friendly format with colors
    const chartData = Object.entries(clusterCount).map(([name, count]) => ({
        name,
        count,
        fill: CLUSTER_COLORS[name] || "#8884d8" // Fallback color
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar
                    dataKey="count"
                    name="Number of Alumni"
                    fill="#8884d8" // This will be overridden by individual fills
                >
                    {chartData.map((entry, index) => (
                        <Bar
                            key={`bar-${index}`}
                            dataKey="count"
                            name={entry.name}
                            fill={entry.fill}
                            stackId="a"
                        />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default ClusterChart;