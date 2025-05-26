import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

// Dynamic label generator based on clustering type
const getClusterLabel = (clusteringType, clusterNumber) => {
    if (clusteringType === "kmeans-profile") {
        switch (clusterNumber) {
            case 0:
                return "Cluster A: Young Graduates with Bachelor's";
            case 1:
                return "Cluster B: Experienced Graduates with Master's";
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

    // Fallback for unknown types
    return `Cluster ${clusterNumber}`;
};

const ClusterChart = ({ data, clusteringType = "kmeans-profile" }) => {
    if (!Array.isArray(data)) {
        return <p>No clustering data available.</p>;
    }

    // Group data by readable cluster labels
    const clusterCount = data.reduce((acc, curr) => {
        const label = getClusterLabel(clusteringType, curr.kmeans_cluster);
        acc[label] = (acc[label] || 0) + 1;
        return acc;
    }, {});

    // Convert to chart-friendly format
    const chartData = Object.entries(clusterCount).map(([name, count]) => ({
        name,
        count,
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default ClusterChart;
