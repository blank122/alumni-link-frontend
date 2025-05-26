import {
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";

const getClusterLabel = (clusterNumber) => {
    switch (clusterNumber) {
        case 0:
            return "Cluster A: Young Graduates with Bachelor's";
        case 1:
            return "Cluster B: Experienced Graduates with Master's";
        default:
            return `Cluster ${clusterNumber}`;
    }
};


const ClusterChart = ({ data }) => {
    if (!Array.isArray(data)) {
        return <p>No clustering data available.</p>;
    }

    const clusterCount = data.reduce((acc, curr) => {
        const label = getClusterLabel(curr.kmeans_cluster);
        acc[label] = (acc[label] || 0) + 1;
        return acc;
    }, {});

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
