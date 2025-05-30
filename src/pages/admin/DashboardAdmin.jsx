/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import useDashboardAnalytics from "../../hooks/DashboardAnalytics";
import StatsCard from "../../components/StatsCard";
import { FaCheckCircle, FaUserTimes, FaBriefcase, FaLaptopCode } from "react-icons/fa";
import DashboardCharts from "../../components/DashboardChart";
const DashboardAdmin = () => {
    const { token } = useAuth();
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");


    const { data, loading, error } = useDashboardAnalytics(token, fromDate, toDate);

    const registered = data?.summary?.registeredAccounts || 0;
    const approved = data?.summary?.approvedAccounts || 0;
    const pending = data?.summary?.pendingAccounts || 0;
    const employed = data?.summary?.employedAccounts || 0;
    const freelance = data?.summary?.freelanceAccounts || 0;
    const unemployed = data?.summary?.unemployedAccounts || 0;

    const monthlyData = data?.monthly || [];



    return (
        <div className="flex flex-col h-screen p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm">
                {/* Heading */}
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>

                {/* Date Filter Inputs */}
                <div className="flex items-center gap-2">
                    <label htmlFor="fromDate" className="text-sm text-gray-600">From:</label>
                    <input
                        type="date"
                        id="fromDate"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label htmlFor="toDate" className="text-sm text-gray-600">To:</label>
                    <input
                        type="date"
                        id="toDate"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Unemployment Card */}
            <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

                <StatsCard
                    icon={FaCheckCircle}
                    title="Registered Accounts"
                    value={registered}
                    isLoading={loading}
                    bgColor="bg-red-100 text-red-700"
                />
                <StatsCard
                    icon={FaCheckCircle}
                    title="Approved Accounts"
                    value={approved}
                    isLoading={loading}
                    bgColor="bg-blue-100 text-blue-700"
                />
                <StatsCard
                    icon={FaUserTimes}
                    title="Total Unemployed"
                    value={monthlyData.reduce((acc, item) => acc + (item.unemployed || 0), 0)}
                    isLoading={loading}
                    bgColor="bg-orange-100 text-orange-700"
                />

                <StatsCard
                    icon={FaBriefcase}
                    title="Employed"
                    value={employed}
                    isLoading={loading}
                    bgColor="bg-green-100 text-green-700"
                />

                <StatsCard
                    icon={FaLaptopCode}
                    title="Freelance"
                    value={freelance}
                    isLoading={loading}
                    bgColor="bg-blue-100 text-blue-700"
                />

                <StatsCard
                    icon={FaUserTimes}
                    title="Pending"
                    value={pending}
                    isLoading={loading}
                    bgColor="bg-orange-200"
                />


            </div>

            <DashboardCharts data={monthlyData} />

        </div>
    );
};

export default DashboardAdmin;
