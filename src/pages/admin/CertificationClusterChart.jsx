import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import axios from 'axios';

const CertificationClusterChart = () => {
  const [data, setData] = useState([]);
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50'];

  useEffect(() => {
    // Replace with your actual Laravel API endpoint
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/clustered-certification-employment`)
      .then(response => {
        setData(response.data.summary); // Assumes response has { summary: [...] }
      })
      .catch(error => {
        console.error('Error fetching certification clusters:', error);
      });
  }, []);

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg mt-8">
      <h2>Certification Clusters by Employment Status</h2>
      <p className="text-sm text-gray-600 mt-4">
        This bar chart visualizes the distribution of alumni certifications clustered by employment status and relevance to their current job roles. Each bar represents a group of alumni whose certifications fall into one of four categories:
        <ul className="list-disc pl-5 mt-2">
          <li><strong>Related & Employed:</strong> Alumni whose certifications are related to their current jobs and are currently employed.</li>
          <li><strong>Related & Unemployed:</strong> Alumni with job-related certifications but currently not employed.</li>
          <li><strong>Not Related & Employed:</strong> Alumni who are employed, but their certifications are not directly related to their current jobs.</li>
          <li><strong>Not Related & Unemployed:</strong> Alumni whose certifications are unrelated to jobs and are currently unemployed.</li>
        </ul>
        This clustering helps identify how certifications align with job outcomes and may guide curriculum planning or career support initiatives.
      </p>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" name="Number of Alumni">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CertificationClusterChart;
