import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  FiAward,
  FiUsers,
  FiBriefcase,
  FiTrendingUp,
  FiAlertCircle,
  FiCheckCircle
} from 'react-icons/fi';

const CertificationClusterChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modern color palette with Tailwind colors
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const clusterDescriptions = {
    "Not Related & Freelance": {
      icon: FiBriefcase,
      color: '#3B82F6',
      description: "Alumni working as freelancers in areas where their certifications are not directly related to their freelance work."
    },
    "Not Related & Unemployed": {
      icon: FiAlertCircle,
      color: '#EF4444',
      description: "Alumni whose certifications are unrelated to jobs and are currently unemployed."
    },
    "Related & Freelance": {
      icon: FiTrendingUp,
      color: '#10B981',
      description: "Alumni with job-related certifications but currently working as freelancers."
    },
    "Not Related & Employed": {
      icon: FiUsers,
      color: '#F59E0B',
      description: "Alumni who are employed, but their certifications are not directly related to their current jobs."
    },
    "Related & Employed": {
      icon: FiCheckCircle,
      color: '#8B5CF6',
      description: "Alumni whose certifications are related to their current jobs and are currently employed."
    }
  };

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/clustered-certification-employment`)
      .then(response => {
        setData(response.data.summary || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching certification clusters:', error);
        setError('Failed to load certification data');
        setLoading(false);
      });
  }, []);

  // Custom Tooltip Component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const clusterData = data.find(item => item.label === label);
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 my-5">
          <p className="font-semibold text-gray-900 dark:text-white mb-2">{label}</p>
          <div className="space-y-1 text-sm">
            <p className="text-gray-600 dark:text-gray-400">
              Alumni Count: <span className="font-semibold text-gray-900 dark:text-white">{payload[0].value}</span>
            </p>
            {clusterData && (
              <p className="text-gray-600 dark:text-gray-400">
                Percentage: <span className="font-semibold text-gray-900 dark:text-white">
                  {((payload[0].value / data.reduce((sum, item) => sum + item.count, 0)) * 100).toFixed(1)}%
                </span>
              </p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 my-5"
      >
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-500 dark:text-gray-400">Loading certification data...</p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 my-5"
      >
        <div className="text-center py-12">
          <FiAlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-lg">{error}</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
            Please try refreshing the page
          </p>
        </div>
      </motion.div>
    );
  }

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
            <FiAward className="w-6 h-6 text-indigo-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Certification & Employment Analysis
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              How certifications align with employment outcomes
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <FiUsers className="w-4 h-4" />
          <span>{data.reduce((sum, item) => sum + item.count, 0)} alumni</span>
        </div>
      </div>

      {/* Chart */}
      <div className="mb-6">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.3} />
            <XAxis
              dataKey="label"
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              interval={0}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fill: '#6B7280' }}
              label={{
                value: "Number of Alumni",
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
              name="Number of Alumni"
              radius={[4, 4, 0, 0]}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={clusterDescriptions[entry.label]?.color || colors[index % colors.length]}
                  className="transition-opacity hover:opacity-80"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Cluster Descriptions */}
      <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-200 dark:border-gray-600">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Cluster Descriptions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((cluster, index) => {
            const clusterInfo = clusterDescriptions[cluster.label];
            const IconComponent = clusterInfo?.icon || FiUsers;
            const color = clusterInfo?.color || colors[index % colors.length];

            return (
              <motion.div
                key={cluster.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600"
              >
                <div
                  className="p-2 rounded-lg flex-shrink-0"
                  style={{ backgroundColor: color + '20' }}
                >
                  <IconComponent className="w-4 h-4" style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                    {cluster.label}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    {clusterInfo?.description || 'No description available'}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      {cluster.count} alumni
                    </span>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      {((cluster.count / data.reduce((sum, item) => sum + item.count, 0)) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-start space-x-3">
            <FiAward className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-blue-800 dark:text-blue-300 font-medium mb-1">
                Analysis Summary
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                This visualization helps identify how certifications align with job outcomes and may guide
                curriculum planning or career support initiatives. The data shows the relationship between
                certification relevance and employment status across different alumni segments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CertificationClusterChart;