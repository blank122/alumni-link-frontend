/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FaUserCheck, FaUserClock, FaCheckCircle, FaGlobe, FaBriefcase, FaUserTie, FaUsers, FaUserTimes } from "react-icons/fa";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";

import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import GraduatesLineChart from "../../components/GraduatesLineChart";
import { useClusteringData, useClusteredLocation } from '../../hooks/ClusteringData';
import ClusterChart from "../../components/ClusterChart";

const StatisticalReports = () => {
    const { token } = useAuth();
    const [UnemployedCount, setUnemployedCount] = useState([]);
    const [EmployedCount, setEmployedCount] = useState([]);
    const [FreelanceCount, setFreelance] = useState([]);
    const [LoadingUnemployed, setLoadingUnemployed] = useState(true);
    const [LoadingEmployed, setLoadingEmployed] = useState(true);
    const [LoadingFreelance, setLoadingFreelance] = useState(true);

    const [PendingCount, setPendingAccountsCount] = useState([]);
    const [ApprovedCount, setApprovedAccountsCount] = useState([]);
    const [LoadingPending, setLoadingPending] = useState(true);
    const [LoadingApproved, setLoadingApproved] = useState(true);

    const [TotalAccountsCount, setTotalAccountsCount] = useState([]);
    const [LoadingTotal, setLoadingTotal] = useState(true);

    const [UserRegDemograph, setUserRegDemograph] = useState([]);
    const [LoadingDemograph, setLoadingDemograph] = useState(true);

    const [AlumniUnemploymentDemograph, setAlumniUnemploymentDemograph] = useState([]);
    const [LoadingUnemploymentDemograph, setLoadingUnemploymentDemograph] = useState(true);
    const [GraduatesDemograph, setGraduatesDemograph] = useState([]);
    const [LoadingGraduates, setLoadingGraduates] = useState(true);

    //clustering data  
    const { data: analysis, loadingData: loadingAnalysis } = useClusteringData(token);
    const { data: locationAnalysis, loadingData: loadingLocation } = useClusteredLocation(token);


    useEffect(() => {
        const fetchUnemployedData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/admin/unemployed-alumni", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });
                setUnemployedCount(response.data.data);
            } catch (error) {
                console.error("Error fetching alumni data:", error);
            } finally {
                setLoadingUnemployed(false);
            }
        };

        if (token) {
            fetchUnemployedData();
        }
    }, [token]);

    useEffect(() => {
        const fetchEmployedData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/admin/employed-alumni", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });
                setEmployedCount(response.data.data);
            } catch (error) {
                console.error("Error fetching alumni data:", error);
            } finally {
                setLoadingEmployed(false);
            }
        };

        if (token) {
            fetchEmployedData();
        }
    }, [token]);

    useEffect(() => {
        const fetchFreelance = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/admin/freelance-alumni", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });
                setFreelance(response.data.data);
            } catch (error) {
                console.error("Error fetching alumni data:", error);
            } finally {
                setLoadingFreelance(false);
            }
        };

        if (token) {
            fetchFreelance();
        }
    }, [token]);


    useEffect(() => {
        const fetchPendingData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/admin/pending-accounts", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });
                setPendingAccountsCount(response.data.data);
            } catch (error) {
                console.error("Error fetching alumni data:", error);
            } finally {
                setLoadingPending(false);
            }
        };

        if (token) {
            fetchPendingData();
        }
    }, [token]);

    useEffect(() => {
        const fetchApprovedData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/admin/approved-accounts", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });
                setApprovedAccountsCount(response.data.data);
            } catch (error) {
                console.error("Error fetching alumni data:", error);
            } finally {
                setLoadingApproved(false);
            }
        };

        if (token) {
            fetchApprovedData();
        }
    }, [token]);

    useEffect(() => {
        const fetchTotalAccounts = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/admin/total-accounts", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });
                setTotalAccountsCount(response.data.data);
            } catch (error) {
                console.error("Error fetching alumni data:", error);
            } finally {
                setLoadingTotal(false);
            }
        };

        if (token) {
            fetchTotalAccounts();
        }
    }, [token]);


    useEffect(() => {
        const fetchUserRegDemograph = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/admin/registration-data", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });
                setUserRegDemograph(response.data.data);
            } catch (error) {
                console.error("Error fetching alumni data:", error);
            } finally {
                setLoadingDemograph(false);
            }
        };

        if (token) {
            fetchUserRegDemograph();
        }
    }, [token]);


    useEffect(() => {
        const fetchUnemploymentDemograph = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/admin/unemployment", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });
                setAlumniUnemploymentDemograph(response.data.data);
            } catch (error) {
                console.error("Error fetching alumni data:", error);
            } finally {
                setLoadingUnemploymentDemograph(false);
            }
        };

        if (token) {
            fetchUnemploymentDemograph();
        }
    }, [token]);

    // graduates demograph
    useEffect(() => {
        const fetchGraduatesDemograph = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/graduates-per-year", {
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



    // Static Data for Charts
    const employmentData = [
        { name: "Employed", value: EmployedCount ?? 0, color: "#f97316" },
        { name: "Freelancing", value: FreelanceCount ?? 0, color: "#fbbf24" },
        { name: "Unemployed", value: UnemployedCount ?? 0, color: "#6b7280" },
    ];

    const jobSeekerData = [
        { month: "Jan", seekers: 3 },
        { month: "Feb", seekers: 5 },
        { month: "Mar", seekers: 6 },
        { month: "Apr", seekers: 4 },
        { month: "May", seekers: 8 },
        { month: "Jun", seekers: 10 },
    ];

    return (
        <div className="flex flex-col h-screen p-6">
            <h1 className="text-2xl font-bold">Statistical Reports</h1>

            {/* Unemployment Card */}
            <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >

            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {/* Unemployed Alumni Card */}
                <motion.div
                    className="p-8 bg-gray-300 shadow-lg rounded-xl flex flex-col items-center w-full max-w-md"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center space-x-4">
                        {/* Icon */}
                        <div className="text-4xl text-gray-700">
                            <FaUserTimes />
                        </div>


                        {/* Text Content */}
                        <div>
                            <p className="text-gray-800 text-lg">Unemployed Alumni</p>
                            {LoadingUnemployed ? (
                                <p className="text-gray-500">Loading...</p>
                            ) : (
                                <p className="text-3xl font-extrabold text-gray-900">{UnemployedCount ?? 0}</p>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Employed Alumni Card */}
                <motion.div
                    className="p-4 bg-orange-200 shadow-lg rounded-xl flex items-center w-full max-w-md"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center space-x-4">
                        {/* Icon */}
                        <div className="text-4xl text-gray-700">
                            <FaBriefcase />
                        </div>


                        {/* Text Content */}
                        <div>
                            <p className="text-gray-800 text-lg">Employed Alumni</p>
                            {LoadingEmployed ? (
                                <p className="text-gray-500">Loading...</p>
                            ) : (
                                <p className="text-3xl font-extrabold text-gray-900">{EmployedCount ?? 0}</p>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Freelancing Alumni Card */}
                <motion.div
                    className="p-4 bg-amber-300 shadow-lg rounded-xl flex items-center w-full max-w-md"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center space-x-4">
                        {/* Icon */}
                        <div className="bg-yellow-500 p-2 rounded-full">
                            <svg className="w-8 h-8 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                        </div>

                        {/* Text Content */}
                        <div>
                            <p className="text-gray-800 text-lg">Freelance Alumni</p>
                            {LoadingFreelance ? (
                                <p className="text-gray-500">Loading...</p>
                            ) : (
                                <p className="text-3xl font-extrabold text-gray-900">{FreelanceCount ?? 0}</p>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Approved Accounts Alumni Card */}
                <motion.div
                    className="p-4 bg-blue-200 shadow-lg rounded-xl flex items-center w-full max-w-md"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center space-x-4">
                        {/* Icon */}
                        <div className="text-4xl text-gray-700">
                            <FaCheckCircle />
                        </div>


                        {/* Text Content */}
                        <div>
                            <p className="text-gray-800 text-lg">Approved Accounts</p>
                            {LoadingApproved ? (
                                <p className="text-gray-500">Loading...</p>
                            ) : (
                                <p className="text-3xl font-extrabold text-gray-900">{ApprovedCount ?? 0}</p>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Employed Alumni Card */}
                <motion.div
                    className="p-4 bg-red-200 shadow-lg rounded-xl flex items-center w-full max-w-md"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center space-x-4">
                        {/* Icon */}
                        <div className="text-4xl text-gray-700">
                            <FaUserCheck />
                        </div>


                        {/* Text Content */}
                        <div>
                            <p className="text-gray-800 text-lg">Registered Accounts</p>
                            {LoadingTotal ? (
                                <p className="text-gray-500">Loading...</p>
                            ) : (
                                <p className="text-3xl font-extrabold text-gray-900">{TotalAccountsCount ?? 0}</p>
                            )}
                        </div>
                    </div>
                </motion.div>


            </div>

            {/* Analytics Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {/* Employment Distribution */}
                <div className="bg-white p-6 shadow-lg rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Employment Distribution</h2>
                    <p className="text-sm text-gray-500 mb-4">
                        Shows the current employment status breakdown of alumni. Hover over segments to see exact percentages.
                    </p>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={employmentData} dataKey="value" nameKey="name" outerRadius={100}>
                                {employmentData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend
                                layout="horizontal"
                                verticalAlign="bottom"
                                align="center"
                                formatter={(value, entry, index) => {
                                    // Customize the legend text if needed
                                    return <span className="text-sm text-gray-600">{value}</span>;
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Alumni Registration Over Time */}
                <div className="bg-white p-6 shadow-lg rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Alumni Registration Over Time</h2>
                    {LoadingDemograph ? (
                        <p>Loading...</p>
                    ) : (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={UserRegDemograph}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#3b82f6" />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>

            {/* Job Seeker Status Over Time */}
            <div className="bg-white p-6 shadow-lg rounded-lg mt-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Unemployed Overtime</h2>
                <p className="text-sm text-gray-500 mb-4">
                    Displays monthly trends in alumni unemployment. The green line shows fluctuations in job seekers among alumni.
                </p>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={AlumniUnemploymentDemograph}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="count" stroke="#10b981" strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* graduate per academic schoolyear */}

            {LoadingGraduates ? (
                <p>Loading graduates data...</p>
            ) : (
                <div className="bg-white p-6 shadow-lg rounded-lg mt-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Alumni Graduates Overtime</h2>
                    <p className="text-sm text-gray-500 mb-4">
                        This chart illustrates the number of alumni who graduated each year. It provides a historical overview of graduation trends and helps identify periods of growth or decline in alumni graduation rates.
                    </p>
                    <GraduatesLineChart data={GraduatesDemograph} />

                </div>
            )}

            {loadingAnalysis ? (
                <p>Loading Clustering analysis data...</p>
            ) : (
                <div className="bg-white p-6 shadow-lg rounded-lg mt-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Alumni Clustering Analysis</h2>
                    <p className="text-sm text-gray-500 mb-4">
                        This chart displays the results of a clustering algorithm (hierarchical clustering) used to group alumni into distinct clusters based on shared attributes such as employment status, job location, or related metrics.
                        Each bar represents the number of alumni within a specific cluster, helping to uncover hidden patterns and similarities among different graduate profiles.                    </p>
                    <ClusterChart data={analysis} clusteringType="kmeans-profile" />

                </div>
            )}

            {loadingLocation ? (
                <p>Loading Clustering analysis data...</p>
            ) : (
                <div className="bg-white p-6 shadow-lg rounded-lg mt-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Alumni Work Location Analysis</h2>
                    <p className="text-sm text-gray-500 mb-4">
                        This chart visualizes the results of a location-based clustering algorithm (K-Means) that groups alumni according to their current work locations.
                        Alumni are categorized into two distinct clusters: those working within the Philippines and those working abroad.
                        This analysis helps highlight the geographic distribution of alumni employment, offering valuable insights into graduate mobility and potential global career reach.
                    </p>
                    <ClusterChart data={locationAnalysis} clusteringType="kmeans-location" />

                </div>
            )}


        </div>
    );
};

export default StatisticalReports;
