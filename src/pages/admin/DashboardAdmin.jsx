/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FaUserCheck, FaUserClock, FaCheckCircle, FaGlobe, FaBriefcase, FaUserTie, FaUsers, FaUserTimes } from "react-icons/fa";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";

import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import StatsCard from "../../components/StatsCard";
const DashboardAdmin = () => {
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


    // Static Data for Charts
    const employmentData = [
        { name: "Employed", value: EmployedCount ?? 0, color: "#f97316" },
        { name: "Freelancing", value: FreelanceCount ?? 0, color: "#fbbf24" },
        { name: "Unemployed", value: UnemployedCount ?? 0, color: "#6b7280" },
    ];

    return (
        <div className="flex flex-col h-screen p-6">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>

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
                <StatsCard
                    icon={FaUserTimes}
                    title="Unemployed Alumni"
                    value={UnemployedCount}
                    isLoading={LoadingUnemployed}
                    bgColor="bg-orange-200"
                />
                {/* Employed Alumni Card */}
                <StatsCard
                    icon={FaBriefcase}
                    title="Employed Alumni"
                    value={EmployedCount}
                    isLoading={LoadingEmployed}
                    bgColor="bg-green-200"
                />
                {/* Freelancing Alumni Card */}
                <StatsCard
                    icon={FaBriefcase}
                    title="Freelance Alumni"
                    value={FreelanceCount}
                    isLoading={LoadingFreelance}
                    bgColor="bg-brown-200"
                />
                <StatsCard
                    icon={FaUserClock}
                    title="Pending Accounts"
                    value={PendingCount}
                    isLoading={LoadingPending}
                    bgColor="bg-purple-200"
                />

                <StatsCard
                    icon={FaCheckCircle}
                    title="Approved Accounts"
                    value={ApprovedCount}
                    isLoading={LoadingApproved}
                    bgColor="bg-blue-200"
                />

                <StatsCard
                    icon={FaCheckCircle}
                    title="Registered Accounts"
                    value={TotalAccountsCount}
                    isLoading={LoadingTotal}
                    bgColor="bg-red-200"
                />
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
                    <p className="text-sm text-gray-500 mb-4">
                        Tracks the number of new alumni registrations by month. Helps identify growth trends and peak registration periods.
                    </p>
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



        </div>
    );
};

export default DashboardAdmin;
