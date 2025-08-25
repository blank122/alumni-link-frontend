/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FaUserTimes, FaSms, FaEnvelope } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import StatsCard from "../../components/StatsCard";
import { useAlumniUnemployedCoursesData } from "../../hooks/AlumniData";
import { useState } from "react";

const UnemploymentUpdates = () => {
    const { token } = useAuth();
    const { data, dataLoading } = useAlumniUnemployedCoursesData(token);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [actionType, setActionType] = useState(''); // "sms" or "email"

    const [isLoading, setIsLoading] = useState(false);


    if (dataLoading) return <p>Loading...</p>;

    // Prevent accessing undefined
    if (!data || !data.unemployed) return <p>No data available</p>;

    // Calculate totals
    const totalUnemployed = data.unemployed || {};
    const message = data?.message;
    console.log(totalUnemployed);

    const courseNames = {
        1: "Bachelor of Science in Information Technology",
        2: "Bachelor of Science in Computer Science",
        3: "Bachelor of Science in Information Systems",
        4: "Bachelor of Library and Information Science",
        5: "Bachelor of Science in Entertainment and Multimedia Computing - Digital Animation",
        6: "Bachelor of Science in Entertainment and Multimedia Computing - Game Development",
        7: "Bachelor of Arts in Multimedia Arts"
    };

    return (
        <div className="flex flex-col h-screen p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-bold">Unemployment Updates</h1>

                <div className="flex gap-3">
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow"
                        onClick={() => {
                            setActionType('sms');
                            setIsModalOpen(true);
                        }}
                    >
                        <FaSms />
                        Send SMS Updates
                    </button>

                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow"
                        onClick={() => {
                            setActionType('email');
                            setIsModalOpen(true);
                        }}
                    >
                        <FaEnvelope />
                        Send Email Updates
                    </button>
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow"
                        onClick={() => {
                            setActionType('email');
                            setIsModalOpen(true);
                        }}
                    >
                        <FaSms />
                        Send Single SMS Update
                    </button>
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
                {Object.entries(data.unemployed).map(([key, value]) => {
                    const courseId = key.split('_')[1]; // Get the number after 'unemployed_'
                    const courseName = courseNames[courseId] || `Unknown Course (${courseId})`;

                    return (
                        <StatsCard
                            key={key}
                            icon={FaUserTimes}
                            title={courseName}
                            value={value}
                            isLoading={false}
                            bgColor="bg-red-100"
                        />
                    );
                })}


            </div>

            {/* might add a table here later */}

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-lg font-semibold mb-4">Confirm Action</h2>
                        <p className="mb-6">
                            Are you sure you want to send {actionType === 'sms' ? 'SMS' : 'Email'} updates to all alumni?
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className={`px-4 py-2 ${actionType === 'sms' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'
                                    } text-white rounded`}
                                onClick={async () => {
                                    setIsLoading(true);

                                    try {
                                        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/unemployed-updates`
                                            , {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    // Add any additional headers like authorization if needed
                                                    // 'Authorization': 'Bearer your-token',
                                                },
                                                body: JSON.stringify({
                                                    actionType: actionType, // sending the action type (sms or email)
                                                    // add any other required data here
                                                }),
                                            });

                                        if (!response.ok) {
                                            throw new Error('Network response was not ok');
                                        }

                                        const data = await response.json();
                                        console.log('Success:', data);
                                        alert('Send Email update successfully');
                                        setIsModalOpen(false);
                                        // Optionally show a success message to the user
                                    } catch (error) {
                                        console.error('Error:', error);
                                        // Optionally show an error message to the user
                                    }
                                    finally {
                                        setIsLoading(false);
                                    }
                                }}
                            >
                                {isLoading ? 'Sending...' : 'Confirm'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>


    );
};

export default UnemploymentUpdates;
