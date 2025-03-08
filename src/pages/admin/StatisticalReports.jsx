import { motion } from "framer-motion";
import { FaUserCheck, FaUserClock, FaCheckCircle, FaGlobe, FaBriefcase, FaUserTie, FaUsers, FaUserTimes } from "react-icons/fa";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
const StatisticalReports = () => {

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

    // Static Data for Charts
    const employmentData = [
        { name: "Employed", value: 29, color: "#f97316" },
        { name: "Self-Employed", value: 6, color: "#fbbf24" },
        { name: "Unemployed", value: 7, color: "#6b7280" },
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
