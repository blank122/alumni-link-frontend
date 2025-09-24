/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FaUserTimes, FaSms, FaEnvelope } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import StatsCard from "../../components/StatsCard";
import { useAlumniUnemployedCoursesData } from "../../hooks/AlumniData";
import { useState } from "react";
import axios from "axios";
import { Users, Calendar } from "lucide-react"; // Add this at the top

const UnemploymentUpdates = () => {
    const { token } = useAuth();
    const { data, dataLoading } = useAlumniUnemployedCoursesData(token);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [actionType, setActionType] = useState(''); // "sms" or "email"

    const [isLoading, setIsLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleSend = async () => {
        if (!phoneNumber) {
            alert("Please enter a valid phone number.");
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/send-updates/${phoneNumber}`
            );
            alert(response.data.message);
            setIsOpen(false);
        } catch (error) {
            const message = error.response?.data?.error || "Something went wrong.";
            alert(message);
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (dataLoading) return <p className="text-center mt-10">Loading...</p>;
    if (!data || !data.unemployed) return <p className="text-center mt-10">No data available</p>;

    const totalUnemployed = data.unemployed || {};
    const courseNames = {
        1: "BSc Information Technology",
        2: "BSc Computer Science",
        3: "BSc Information Systems",
        4: "Bachelor of Library & Information Science",
        5: "BSc Entertainment & Multimedia - Digital Animation",
        6: "BSc Entertainment & Multimedia - Game Development",
        7: "BA Multimedia Arts"
    };

    return (
        <div className="flex flex-col min-h-screen p-6 bg-gray-50">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                {/* Left side */}
                <div className="flex flex-col gap-2">
                    <h1 className="flex items-center text-3xl font-bold text-gray-800 gap-2">
                        <Users className="w-6 h-6 text-blue-600" />
                        Unemployment Updates
                    </h1>
                    <p className="flex items-center text-gray-600 gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        These are the numbers of unemployed alumni on each course this month
                    </p>
                </div>

                {/* Right side */}
                <div className="flex flex-col sm:flex-row gap-3 mt-2 md:mt-0">
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition"
                        onClick={() => {
                            setActionType('sms');
                            setIsModalOpen(true);
                        }}
                    >
                        <FaSms /> Send SMS Updates
                    </button>

                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition"
                        onClick={() => {
                            setActionType('email');
                            setIsModalOpen(true);
                        }}
                    >
                        <FaEnvelope /> Send Email Updates
                    </button>

                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition"
                        onClick={() => setIsOpen(true)}
                    >
                        <FaSms /> Send Single SMS
                    </button>
                </div>
            </div>



            {/* Stats Cards */}
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {Object.entries(totalUnemployed).map(([key, value]) => {
                    const courseId = key.split('_')[1];
                    const courseName = courseNames[courseId] || `Unknown Course (${courseId})`;

                    return (
                        <StatsCard
                            key={key}
                            icon={FaUserTimes}
                            title={courseName}
                            value={value}
                            isLoading={false}
                            bgColor="bg-red-50"
                        />
                    );
                })}
            </motion.div>

            {/* Bulk Send Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <motion.div
                        className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-xl font-semibold mb-4">Confirm Action</h2>
                        <p className="mb-6">
                            Are you sure you want to send <strong>{actionType === 'sms' ? 'SMS' : 'Email'}</strong> updates to all alumni?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className={`px-4 py-2 text-white rounded-lg transition ${actionType === 'sms'
                                    ? 'bg-blue-600 hover:bg-blue-700'
                                    : 'bg-green-600 hover:bg-green-700'
                                    }`}
                                onClick={async () => {
                                    setIsLoading(true);
                                    try {
                                        const response = await fetch(
                                            `${import.meta.env.VITE_API_BASE_URL}/unemployed-updates`,
                                            {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({ actionType }),
                                            }
                                        );
                                        if (!response.ok) throw new Error('Network response was not ok');
                                        const data = await response.json();
                                        alert(`${actionType === 'sms' ? 'SMS' : 'Email'} updates sent successfully!`);
                                        setIsModalOpen(false);
                                    } catch (err) {
                                        console.error(err);
                                        alert('Failed to send updates. Please try again.');
                                    } finally {
                                        setIsLoading(false);
                                    }
                                }}
                            >
                                {isLoading ? 'Sending...' : 'Confirm'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Single SMS Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    <motion.div
                        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-xl font-semibold mb-4">Send SMS</h2>

                        <input
                            type="text"
                            placeholder="Enter phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />

                        <div className="flex justify-end gap-3">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                                onClick={handleSend}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Sending...' : 'Send'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default UnemploymentUpdates;
