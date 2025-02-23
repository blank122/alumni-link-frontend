import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUserCheck, FaUserClock, FaCheckCircle, FaGlobe, FaBriefcase, FaUserTie, FaUsers, FaUserTimes } from "react-icons/fa";

const DashboardAdmin = () => {
    const { user, token } = useAuth();
    const [account, setAccount] = useState([]);
    const [loading, setLoading] = useState(true);

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

    // Stats Data
    const stats = [
        { title: "Registered", value: 48, icon: <FaUserCheck />, color: "bg-red-200" },
        { title: "Pending", value: 14, icon: <FaUserClock />, color: "bg-purple-200" },
        { title: "Approved", value: 6, icon: <FaCheckCircle />, color: "bg-blue-200" },
        { title: "Online", value: 30, icon: <FaGlobe />, color: "bg-green-200" },
        { title: "Job Seeker", value: 10, icon: <FaUsers />, color: "bg-yellow-200" },
        { title: "Employed", value: 29, icon: <FaBriefcase />, color: "bg-orange-200" },
        { title: "Self-Employed", value: 6, icon: <FaUserTie />, color: "bg-amber-300" },
        { title: "Unemployed", value: 7, icon: <FaUserTimes />, color: "bg-gray-300" },
    ];

    return (
        <div className="flex flex-col h-screen p-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>

            {/* Statistics Cards */}
            <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        className={`flex items-center p-4 rounded-lg shadow-md ${stat.color} cursor-pointer`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    >
                        <div className="text-4xl text-gray-700">{stat.icon}</div>
                        <div className="ml-4">
                            <p className="text-sm font-semibold text-gray-600">{stat.title}</p>
                            <p className="text-xl font-bold">{stat.value}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* User Info */}
            <motion.div
                className="mt-6 p-4 bg-gray-100 rounded-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-xl font-semibold">User Info</h2>
                {user ? (
                    <div>
                        <p><strong>Account ID:</strong> {user.id}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Role:</strong> {user.account_type}</p>
                    </div>
                ) : (
                    <p>Loading user data...</p>
                )}
            </motion.div>

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

export default DashboardAdmin;
