/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUserCheck, FaUserClock, FaCheckCircle, FaGlobe, FaBriefcase, FaUserTie, FaUsers, FaUserTimes } from "react-icons/fa";
const AlumniList = () => {
    const { user, token } = useAuth();
    const [account, setAccount] = useState([]);
    const [loading, setLoading] = useState(true);
    const [PendingCount, setPendingAccountsCount] = useState([]);
    const [ApprovedCount, setApprovedAccountsCount] = useState([]);
    const [LoadingPending, setLoadingPending] = useState(true);
    const [LoadingApproved, setLoadingApproved] = useState(true);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchAlumniData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/get-alumni", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });
                setAccount(response.data.data);
            } catch (error) {
                console.error("Error fetching alumni data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchAlumniData();
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
                const response = await axios.get(
                    `${API_BASE_URL}/admin/approved-accounts`, // Using API_BASE_URL from .env
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    }
                );
                setApprovedAccountsCount(response.data.data);
            } catch (error) {
                console.error("Error fetching approved accounts data:", error);
            } finally {
                setLoadingApproved(false);
            }
        };

        if (token) {
            fetchApprovedData();
        }
    }, [token, API_BASE_URL]);

    return (
        <div className={`flex flex-col h-screen p-6`}>
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
                            <p className="text-gray-800 text-lg">Pending Accounts</p>
                            {LoadingPending ? (
                                <p className="text-gray-500">Loading...</p>
                            ) : (
                                <p className="text-3xl font-extrabold text-gray-900">{PendingCount ?? 0}</p>
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
                            <p className="text-gray-800 text-lg">Approved Accounts</p>
                            {LoadingApproved ? (
                                <p className="text-gray-500">Loading...</p>
                            ) : (
                                <p className="text-3xl font-extrabold text-gray-900">{ApprovedCount ?? 0}</p>
                            )}
                        </div>
                    </div>
                </motion.div>


            </div>


            {/* Alumni Accounts Table */}
            <motion.div
                className="mt-6 p-4 bg-white shadow-md rounded-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Alumni Accounts Data</h2>
                {loading ? (
                    <p className="text-gray-500">Loading alumni data...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="px-6 py-3 text-left">Registration Date</th>
                                    <th className="px-6 py-3 text-left">Name</th>
                                    <th className="px-6 py-3 text-left">Email</th>
                                    <th className="px-6 py-3 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {account.length > 0 ? (
                                    account.map((item, index) => (
                                        <motion.tr
                                            key={item.id}
                                            className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200 transition`}
                                            whileHover={{ scale: 1.02 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <td className="px-6 py-4 text-gray-700">
                                                {new Date(item.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {item.alumni?.alm_first_name || "N/A"} {item.alumni?.alm_last_name || "N/A"}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">{item.email || "N/A"}</td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {item.status === 1 ? "Pending" : "Rejected"}
                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center p-4 text-gray-500">No Account data found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </motion.div>

        </div>
    );
};

export default AlumniList;
