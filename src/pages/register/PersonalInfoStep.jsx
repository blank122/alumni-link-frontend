/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import ProgressBar from "../user/Components/ProgressBar";

const PersonalInfoStep = ({ userData, handleChange, errors, currentStepIndex, totalSteps }) => {
    return (
        <motion.div
            className="p-8 bg-white rounded-2xl shadow-lg w-full max-w-md mx-auto border border-gray-200"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >

            <div className="w-full max-w-3xl">
                <ProgressBar currentStepIndex={currentStepIndex} totalSteps={totalSteps} />
            </div>
            {/* Header with Gradient Bar */}
            <div className="flex items-center gap-3 mb-7">
                <div className="w-2 h-8 bg-gradient-to-r from-green-500 to-yellow-400 rounded"></div>
                <h2 className="text-3xl font-bold text-gray-800 tracking-tight">General Information</h2>
            </div>

            <div className="space-y-6">
                {/* First Name */}
                <div>
                    <input
                        type="text"
                        name="alm_first_name"
                        placeholder="First Name"
                        onChange={handleChange}
                        value={userData.alm_first_name}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-300 hover:border-green-500 focus:scale-[1.01] placeholder-gray-400"
                    />
                    {errors.alm_first_name && <p className="text-red-500 text-xs mt-1">{errors.alm_first_name}</p>}
                </div>

                {/* Last Name */}
                <div>
                    <input
                        type="text"
                        name="alm_last_name"
                        placeholder="Last Name"
                        onChange={handleChange}
                        value={userData.alm_last_name}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-300 hover:border-green-500 focus:scale-[1.01] placeholder-gray-400"
                    />
                    {errors.alm_last_name && <p className="text-red-500 text-xs mt-1">{errors.alm_last_name}</p>}
                </div>

                {/* Gender */}
                <div>
                    <select
                        name="alm_gender"
                        onChange={handleChange}
                        value={userData.alm_gender}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-300 hover:border-green-500 focus:scale-[1.01] text-gray-700"
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    {errors.alm_gender && <p className="text-red-500 text-xs mt-1">{errors.alm_gender}</p>}
                </div>

                {/* Contact Number */}
                <div>
                    <input
                        type="text"
                        name="alm_contact_number"
                        placeholder="Contact Number"
                        maxLength={11}
                        onChange={handleChange}
                        value={userData.alm_contact_number}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-300 hover:border-green-500 focus:scale-[1.01] placeholder-gray-400"
                    />
                    {errors.alm_contact_number && <p className="text-red-500 text-xs mt-1">{errors.alm_contact_number}</p>}
                </div>
            </div>
        </motion.div>
    );
};

export default PersonalInfoStep;
