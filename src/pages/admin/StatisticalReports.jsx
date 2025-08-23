/* eslint-disable no-unused-vars */
import { XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import GraduatesLineChart from "../../components/GraduatesLineChart";
import { useClusteringData, useClusteredLocation, useClusteredCertifications, useClusteredRegionalEmployment } from '../../hooks/ClusteringData';
import ClusterChart from "../../components/ClusterChart";
import CertificationClusters from "./CertificationClusterChart";
import ChartLoading from "../../components/ChartLoading";


const StatisticalReports = () => {
    const { token } = useAuth();

    const [GraduatesDemograph, setGraduatesDemograph] = useState([]);
    const [LoadingGraduates, setLoadingGraduates] = useState(true);

    //clustering data  
    const { data: analysis, loadingData: loadingAnalysis } = useClusteringData(token);
    const { data: locationAnalysis, loadingData: loadingLocation } = useClusteredLocation(token);
    const { data: certAnalysis, loadingData: loadingCert } = useClusteredCertifications(token);
    const { data: regionalEmploymentAnalysis, loadingData: loadingRegional } = useClusteredRegionalEmployment(token);

    // graduates demograph
    useEffect(() => {
        const fetchGraduatesDemograph = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/graduates-per-year`
                    , {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    });
                setGraduatesDemograph(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error("Error fetching alumni data:", error);
            } finally {
                setLoadingGraduates(false);
            }
        };

        if (token) {
            fetchGraduatesDemograph();
        }
    }, [token]);




    return (
        <div className="flex flex-col h-screen p-6">
            <h1 className="text-2xl font-bold">Statistical Reports</h1>

            {/* Job Seeker Status Over Time */}
            {/* graduate per academic schoolyear */}
            <div className="bg-white p-6 shadow-lg rounded-lg mt-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Alumni Graduates Overtime</h2>
                <p className="text-sm text-gray-500 mb-4">
                    This chart illustrates the number of alumni who graduated each year. It provides a historical overview of graduation trends and helps identify periods of growth or decline in alumni graduation rates.
                </p>
                {LoadingGraduates ? (
                    <ChartLoading message="Loading graduates data..." />
                ) : (
                    <GraduatesLineChart data={GraduatesDemograph} />
                )}
            </div>



            <div className="bg-white p-6 shadow-lg rounded-lg mt-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Alumni Clustering Analysis</h2>
                <p className="text-sm text-gray-500 mb-4">
                    This chart displays the results of a clustering algorithm (hierarchical clustering) used to group alumni into distinct clusters based on shared attributes such as employment status, job location, or related metrics.
                    Each bar represents the number of alumni within a specific cluster, helping to uncover hidden patterns and similarities among different graduate profiles.
                </p>
                <ul className="text-sm text-gray-500 mb-4 list-disc pl-5">
                    <li>
                        <span className="font-medium">Mid-Level Aumni </span>
                    </li>
                    <li>
                        <span className="font-medium">Early Career Alumni</span>
                    </li>
                    <li>
                        <span className="font-medium">Experienced Alumni</span>
                    </li>
                    <li>
                        <span className="font-medium">Has Masters Degree</span>
                    </li>
                </ul>
                {loadingAnalysis ? (
                    <ChartLoading message="Loading clustering analysis chart..." />
                ) : (
                    <ClusterChart data={analysis} clusteringType="kmeans-profile" chartType="bar" />
                )}

            </div>

            <div className="bg-white p-6 shadow-lg rounded-lg mt-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Regional Clustering of Employed Alumni
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                    This clustering analysis groups alumni based on the number of those who are currently employed in each region. It provides insights into employment distribution across geographic areas, highlighting where alumni are most likely to be working.
                </p>
                <ul className="text-sm text-gray-500 mb-4 list-disc pl-5">
                    <li>
                        <span className="font-medium">Cluster A: NCR</span>
                    </li>
                    <li>
                        <span className="font-medium">Cluster B: Luzon</span>
                    </li>
                    <li>
                        <span className="font-medium">Cluster C: Visayas</span>
                    </li>
                    <li>
                        <span className="font-medium">Cluster D: Mindanao</span>
                    </li>
                    <li>
                        <span className="font-medium">Cluster E: Outside Philippines</span>
                    </li>
                </ul>
                <p className="text-sm text-gray-500">
                    This analysis helps visualize where graduates are gaining employment and may guide regional career support or alumni engagement strategies.
                </p>

                {loadingRegional ? (
                    <ChartLoading message="Loading clustering analysis chart..." />
                ) : (
                    <ClusterChart data={regionalEmploymentAnalysis} clusteringType="kmeans-ph-regions" chartType="bar" />
                )}

            </div>

            <div className="bg-white p-6 shadow-lg rounded-lg mt-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Alumni Certifications, Technical Skills and Soft Skills Analysis</h2>
                <p className="text-sm text-gray-500 mb-4">
                    This analysis groups alumni into three distinct clusters based on their certifications, technical/soft skills, and career progression.
                    The Clustering algorithm identifies patterns in their professional development, revealing:
                </p>
                <ul className="text-sm text-gray-500 mb-4 list-disc pl-5">
                    <li>
                        <span className="font-medium">Cluster A: Highly Certified Professionals</span> – Alumni with significant certifications and technical skills, often holding advanced degrees or stable employment.
                    </li>
                    <li>
                        <span className="font-medium">Cluster B: Early-Career Alumni</span> – Recent graduates with fewer certifications/skills, likely in entry-level roles or still building their professional profiles.
                    </li>
                    <li>
                        <span className="font-medium">Cluster C: Experienced but Less Certified</span> – Alumni with work experience but fewer formal certifications, possibly in non-technical roles or industries where certifications are less critical.
                    </li>
                </ul>
                <p className="text-sm text-gray-500">
                    This segmentation helps identify trends in alumni upskilling, career trajectories, and potential gaps in certification attainment.
                </p>

                {loadingCert ? (
                    <ChartLoading message="Loading clustering analysis chart..." />
                ) : (
                    <ClusterChart data={certAnalysis} clusteringType="kmeans-certificate" chartType="pie" />
                )}

            </div>
            {/* certificaiton clusters in relation with employment */}
            <CertificationClusters />

        </div>
    );
};

export default StatisticalReports;
