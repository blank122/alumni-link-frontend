/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ProgressBar from "../user/Components/ProgressBar";

const EducationalBackgroundInfo = ({ userData, handleChange, errors, currentStepIndex, totalSteps }) => {
    const [isAttendingMasters, setIsAttendingMasters] = useState(false);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/courses`, {
                    headers: {
                        Accept: "application/json",
                    },
                });
                setCourses(response.data.data);
            } catch (error) {
                console.error("Error fetching um courses:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    const generateAcademicYears = () => {
        const currentYear = new Date().getFullYear();
        const startYear = 2000; // Adjust this as needed
        const years = [];

        for (let year = currentYear; year >= startYear; year--) {
            years.push({
                value: `${year}-${year + 1}`,
                label: `${year}-${year + 1}`
            });
        }

        return years;
    };
    return (
        <motion.div
            className="p-6 bg-white rounded-2xl shadow-lg w-full max-w-md mx-auto border border-gray-200"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="w-full max-w-3xl">
                <ProgressBar currentStepIndex={currentStepIndex} totalSteps={totalSteps} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Educational Background</h2>

            <div className="space-y-4">
                {/* Course Selection */}
                <div>
                    <label htmlFor="course_id" className="block text-sm font-medium text-gray-700">
                        Select Course
                    </label>
                    <select
                        id="course_id"
                        name="course_id"
                        onChange={handleChange}
                        value={userData.course_id || ""}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300"
                    >
                        <option value="">-- Select Course --</option>
                        {loading ? (
                            <option disabled>Loading...</option>
                        ) : (
                            courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.course_name} ({course.course_acronym})
                                </option>
                            ))
                        )}
                    </select>
                    {errors.course_id && <p className="text-red-500 text-xs mt-1">{errors.course_id}</p>}
                </div>

                {/* Academic Year Picker */}
                <div>
                    <label htmlFor="year_graduated" className="block text-sm font-medium text-gray-700">
                        School Year Graduated
                    </label>
                    <select
                        id="year_graduated"
                        name="year_graduated"
                        value={userData.year_graduated || ''}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300"
                    >
                        <option value="">Select Academic Year</option>
                        {generateAcademicYears().map((year) => (
                            <option key={year.value} value={year.value}>
                                {year.label}
                            </option>
                        ))}
                    </select>
                    {errors.year_graduated && <p className="text-red-500 text-xs mt-1">{errors.year_graduated}</p>}
                </div>

                {/* Master's Degree Checkbox */}
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="masters_attending"
                        name="masters_attending"
                        checked={isAttendingMasters}
                        onChange={(e) => setIsAttendingMasters(e.target.checked)}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label htmlFor="masters_attending" className="text-sm font-medium text-gray-700">
                        Currently attending a Master&apos;s Degree?
                    </label>
                </div>

                {/* Conditional Fields for Master's Degree */}
                {isAttendingMasters && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                    >
                        {/* Type of Master's Degree */}
                        <div>
                            <label htmlFor="masters_type" className="block text-sm font-medium text-gray-700">
                                Type of Master&apos;s Degree
                            </label>
                            <input
                                type="text"
                                id="masters_type"
                                name="masters_type"
                                placeholder="e.g., MBA, MSc, MA"
                                onChange={handleChange}
                                value={userData.masters_type || ""}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300"
                            />
                            {errors.masters_type && <p className="text-red-500 text-xs mt-1">{errors.masters_type}</p>}
                        </div>

                        {/* Institution Name */}
                        <div>
                            <label htmlFor="masters_institution" className="block text-sm font-medium text-gray-700">
                                Institution Name
                            </label>
                            <input
                                type="text"
                                id="masters_institution"
                                name="masters_institution"
                                placeholder="Where are you taking this degree?"
                                onChange={handleChange}
                                value={userData.masters_institution || ""}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300"
                            />
                            {errors.masters_institution && <p className="text-red-500 text-xs mt-1">{errors.masters_institution}</p>}
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default EducationalBackgroundInfo;
