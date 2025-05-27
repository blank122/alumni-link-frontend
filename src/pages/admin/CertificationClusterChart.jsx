import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  LabelList
} from 'recharts';

const CertificationClusterChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define colors for each cluster
  const COLORS = {
    0: '#FF6384',  // Not Related & Unemployed
    1: '#36A2EB',  // Not Related & Employed
    2: '#FFCE56',  // Related & Unemployed
    3: '#4BC0C0'   // Related & Employed
  };

  const CLUSTER_LABELS = {
    0: 'Not Related & Unemployed',
    1: 'Not Related & Employed',
    2: 'Related & Unemployed',
    3: 'Related & Employed'
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/clustered-certification-employment');
        const clusterData = response.data;
        
        // Transform the data for Recharts
        const chartData = Object.keys(clusterData).map(clusterId => {
          const clusterName = CLUSTER_LABELS[clusterId] || `Cluster ${clusterId}`;
          const items = clusterData[clusterId] || [];
          
          return {
            clusterId,
            name: clusterName,
            count: items.length,
            examples: items
              .slice(0, 3)
              .map(item => `${item.cert_name} (${item.alumni_name})`)
              .join(', '),
            fullData: items
          };
        });
        
        setData(chartData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-8">Loading data...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const clusterData = payload[0].payload.fullData;
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-lg rounded">
          <p className="font-bold">{payload[0].payload.name}</p>
          <p className="mb-2">Total: {payload[0].value} certifications</p>
          {clusterData.length > 0 && (
            <>
              <p className="font-semibold">Examples:</p>
              <ul className="list-disc pl-5">
                {clusterData.slice(0, 3).map((item, index) => (
                  <li key={index}>{item.cert_name} ({item.alumni_name})</li>
                ))}
                {clusterData.length > 3 && (
                  <li>and {clusterData.length - 3} more...</li>
                )}
              </ul>
            </>
          )}
        </div>
      );
    }
    return null;
  };

  const renderCustomizedLabel = (props) => {
    const { x, y, width, value } = props;
    const radius = 10;

    return (
      <g>
        <text
          x={x + width / 2}
          y={y - radius}
          fill="#fff"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={12}
          fontWeight="bold"
        >
          {value}
        </text>
      </g>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">
        Certification Clusters by Employment Status
      </h2>
      
      <div className="bg-white rounded-lg shadow p-4">
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 60,
              }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={150}
                tick={{ fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="count" name="Number of Certifications">
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[entry.clusterId] || '#8884d8'} 
                  />
                ))}
                <LabelList dataKey="count" content={renderCustomizedLabel} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Hover over bars to see certification examples</p>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-4">
          {data.map((cluster) => (
            <div key={cluster.clusterId} className="bg-gray-50 p-3 rounded">
              <h3 className="font-semibold flex items-center">
                <span 
                  className="inline-block w-3 h-3 mr-2 rounded-full" 
                  style={{ 
                    backgroundColor: COLORS[cluster.clusterId] || '#8884d8' 
                  }}
                ></span>
                {cluster.name} ({cluster.count})
              </h3>
              {cluster.examples && (
                <p className="text-sm mt-1 text-gray-600">
                  {cluster.examples} {cluster.count > 3 && '...'}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CertificationClusterChart;