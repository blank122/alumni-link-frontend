/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FaUserCheck, FaUserClock, FaCheckCircle, FaGlobe, FaBriefcase, FaUserTie, FaUsers, FaUserTimes } from "react-icons/fa";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";

const StatisticalReports = () => {
    const { token } = useAuth();
    const [UnemployedCount, setUnemployedCount] = useState([]);
    const [EmployedCount, setEmployedCount] = useState([]);
    const [FreelanceCount, setFreelance] = useState([]);
    const [LoadingUnemployed, setLoadingUnemployed] = useState(true);
    const [LoadingEmployed, setLoadingEmployed] = useState(true);
    const [LoadingFreelance, setLoadingFreelance] = useState(true);

    useEffect(() => {
        const fetchUnemployedData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/unemployed-alumni", {
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
                const response = await axios.get("http://127.0.0.1:8000/api/employed-alumni", {
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
                const response = await axios.get("http://127.0.0.1:8000/api/freelance-alumni", {
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

    // Static Data for Charts
    const employmentData = [
        { name: "Employed", value: EmployedCount ?? 0, color: "#f97316" },
        { name: "Freelancing", value: FreelanceCount ?? 0, color: "#fbbf24" },
        { name: "Unemployed", value: UnemployedCount ?? 0, color: "#6b7280" },
    ];

    const registrationData = [
        { month: "Jan", count: 5 },
        { month: "Feb", count: 8 },
        { month: "Mar", count: 12 },
        { month: "Apr", count: 7 },
        { month: "May", count: 15 },
        { month: "Jun", count: 20 },
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
            </div>




            {/* Analytics Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {/* Employment Distribution */}
                <div className="bg-white p-6 shadow-lg rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Employment Distribution</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={employmentData} dataKey="value" nameKey="name" outerRadius={100}>
                                {employmentData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Alumni Registration Over Time */}
                <div className="bg-white p-6 shadow-lg rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Alumni Registration Over Time</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={registrationData}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#3b82f6" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Job Seeker Status Over Time */}
            <div className="bg-white p-6 shadow-lg rounded-lg mt-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Job Seekers Over Time</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={jobSeekerData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="seekers" stroke="#10b981" strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer>
            </div>



        </div>
    );
};

export default StatisticalReports;
