/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useState } from "react";

const EducationalBackgroundInfo = ({ userData, handleChange, errors }) => {
    const [isAttendingMasters, setIsAttendingMasters] = useState(false);

    const handleCheckboxChange = (e) => {
        setIsAttendingMasters(e.target.checked);
    };

    return (
        <motion.div
            className="p-6 bg-white rounded-2xl shadow-lg w-full max-w-md mx-auto border border-gray-200"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Educational Background</h2>

            <div className="space-y-4">
                {/* Highest Level of Education */}
                <div>
                    <label htmlFor="educ_highest_level" className="block text-sm font-medium text-gray-700">
                        Highest Level of Education
                    </label>
                    <input
                        type="text"
                        id="educ_highest_level"
                        name="educ_highest_level"
                        placeholder="Enter your highest education level"
                        onChange={handleChange}
                        value={userData.educ_highest_level}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300 hover:border-green-500 focus:scale-[1.02]"
                    />
                    {errors.educ_highest_level && <p className="text-red-500 text-xs mt-1">{errors.educ_highest_level}</p>}
                </div>

                {/* Year Graduated */}
                <div>
                    <label htmlFor="year_graduated" className="block text-sm font-medium text-gray-700">
                        Year Graduated
                    </label>
                    <input
                        type="text"
                        id="year_graduated"
                        name="year_graduated"
                        placeholder="Enter year of graduation"
                        onChange={handleChange}
                        value={userData.year_graduated}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300 hover:border-green-500 focus:scale-[1.02]"
                    />
                    {errors.year_graduated && <p className="text-red-500 text-xs mt-1">{errors.year_graduated}</p>}
                </div>

                {/* Master's Degree Checkbox */}
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="masters_attending"
                        name="masters_attending"
                        checked={isAttendingMasters}
                        onChange={handleCheckboxChange}
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
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300 hover:border-green-500 focus:scale-[1.02]"
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
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300 hover:border-green-500 focus:scale-[1.02]"
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
