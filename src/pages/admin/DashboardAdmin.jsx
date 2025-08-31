/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { useDashboardAnalytics } from "../../hooks/DashboardAnalytics";
import StatsCard from "../../components/StatsCard";
import { FaCheckCircle, FaUserTimes, FaBriefcase, FaLaptopCode } from "react-icons/fa";
import DashboardCharts from "../../components/DashboardChart";
import EmploymentPieChart from "../../components/EmploymentPieChart";
import GraduatesLineChart from "../../components/GraduatesLineChart";
import ChartLoading from "../../components/ChartLoading";

import Select from 'react-select';

const DashboardAdmin = () => {
    const { token } = useAuth();
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const technicalSkills =
    {
        1: "Programming & Software Development",
        2: "Database Management & Information Systems",
        3: "Web & Mobile Development ",
        4: "Networking & Cybersecurity",
        5: "Cloud Computing & DevOps",
        6: "Data Science & AI",
        7: "Software Engineering & SDLC",
        8: "Game Development & Animation",
        9: "Multimedia & Digital Content Creation",
        10: "Human-Computer Interaction (HCI) & UI/UX",
        11: "E-Learning & EdTech",
        12: "Information Retrieval & Digital Libraries",
        13: "Business & Enterprise Computing",
        14: "Game AI & Physics Simulation",
        15: "Augmented & Virtual Reality (AR/VR)",

    }

    const softSkills =
    {
        1: "Problem-Solving",
        2: "Critical Thinking",
        3: "Communication Skills ",
        4: "Collaboration & Teamwork",
        5: "Adaptability & Flexibility",
        6: "Time Management",
        7: "Creativity & Innovation",
        8: "Attention to Detail",
        9: "Emotional Intelligence (EQ)",
        10: "Ethical & Professional Responsibility",

    }

    const courseNames = {
        1: "Bachelor of Science in Information Technology",
        2: "Bachelor of Science in Computer Science",
        3: "Bachelor of Science in Information Systems",
        4: "Bachelor of Library and Information Science",
        5: "Bachelor of Science in Entertainment and Multimedia Computing - Digital Animation",
        6: "Bachelor of Science in Entertainment and Multimedia Computing - Game Development",
        7: "Bachelor of Arts in Multimedia Arts"
    };

    const techOptions = Object.entries(technicalSkills).map(([value, label]) => ({
        value,
        label,
    }));

    const softOptions = Object.entries(softSkills).map(([value, label]) => ({
        value,
        label,
    }));

    const courseOptions = Object.entries(courseNames).map(([value, label]) => ({
        value,
        label,
    }));

    const [selectedTechSkills, setSelectedTechSkills] = useState([]);
    const [selectedSoftSkills, setSelectedSoftSkills] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);

    const { data, loading, error } =
        useDashboardAnalytics(token, fromDate, toDate,
            selectedTechSkills.map(skill => skill.value),
            selectedSoftSkills.map(skill => skill.value),
            selectedCourses.map(course => course.value));

    const registered = data?.summary?.registeredAccounts || 0;
    const approved = data?.summary?.approvedAccounts || 0;
    const pending = data?.summary?.pendingAccounts || 0;
    const employed = data?.summary?.employedAccounts || 0;
    const freelance = data?.summary?.freelanceAccounts || 0;
    const unemployed = data?.summary?.unemployedAccounts || 0;
    const graduatesDemograph = data?.graduates || [];

    const monthlyData = data?.monthly || [];

    // State for multi-select


    return (
        <div className="flex flex-col h-screen p-6">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Date Filter */}
                    <div className="flex flex-col">
                        <label htmlFor="fromDate" className="text-sm text-gray-600 mb-1">From</label>
                        <input
                            type="date"
                            id="fromDate"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                        <label htmlFor="toDate" className="text-sm text-gray-600 mt-3 mb-1">To</label>
                        <input
                            type="date"
                            id="toDate"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Technical Skills */}
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600 mb-1">Technical Skills</label>
                        <Select
                            isMulti
                            options={techOptions}
                            value={selectedTechSkills}
                            onChange={setSelectedTechSkills}
                            className="text-sm"
                        />
                    </div>

                    {/* Soft Skills */}
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600 mb-1">Soft Skills</label>
                        <Select
                            isMulti
                            options={softOptions}
                            value={selectedSoftSkills}
                            onChange={setSelectedSoftSkills}
                            className="text-sm"
                        />
                    </div>

                    {/* Course Names */}
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600 mb-1">Courses</label>
                        <Select
                            isMulti
                            options={courseOptions}
                            value={selectedCourses}
                            onChange={setSelectedCourses}
                            className="text-sm"
                        />
                    </div>
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
            <div className="bg-white p-6 shadow-lg rounded-lg mt-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Alumni Graduates Overtime</h2>
                <p className="text-sm text-gray-500 mb-4">
                    This chart illustrates the number of alumni who graduated each year. It provides a historical overview of graduation trends and helps identify periods of growth or decline in alumni graduation rates.
                </p>
                {loading ? (
                    <ChartLoading message="Loading graduates data..." />
                ) : (
                    <GraduatesLineChart data={graduatesDemograph} />
                )}
            </div>
            <DashboardCharts data={monthlyData} loading={loading} />
            <EmploymentPieChart data={data} loading={loading}/>

        </div>
    );
};

export default DashboardAdmin;
