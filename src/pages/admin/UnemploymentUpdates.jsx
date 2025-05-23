/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FaUserTimes, FaSms, FaEnvelope } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import StatsCard from "../../components/StatsCard";
import { useAlumniUnemployedCoursesData } from "../../hooks/AlumniData";
const UnemploymentUpdates = () => {
    const { token } = useAuth();
    const { data, dataLoading } = useAlumniUnemployedCoursesData(token);



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
                        onClick={() => console.log("Sending SMS updates...")}
                    >
                        <FaSms />
                        Send SMS Updates
                    </button>

                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow"
                        onClick={() => console.log("Sending Email updates...")}
                    >
                        <FaEnvelope />
                        Send Email Updates
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
        </div>
    );
};

export default UnemploymentUpdates;
