/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const PersonalInfoStep = ({ userData, handleChange, errors }) => {
    return (
        <motion.div
            className="p-6 bg-white rounded-xl shadow-xl w-[400px] mx-auto border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Header with Gradient Bar */}
            <div className="flex items-center gap-3 mb-5">
                <div className="w-2 h-7 bg-gradient-to-r from-green-500 to-yellow-500 rounded"></div>
                <h2 className="text-2xl font-semibold text-gray-700">GENERAL INFORMATION</h2>
            </div>
            <div className="space-y-4">
                {/* First Name */}
                <div>
                    <input
                        type="text"
                        name="alm_first_name"
                        placeholder="First Name"
                        onChange={handleChange}
                        value={userData.alm_first_name}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300 hover:border-green-500 focus:scale-[1.02]"
                    />
                    {errors.alm_first_name && <p className="text-red-500 text-sm mt-1">{errors.alm_first_name}</p>}
                </div>

                {/* Last Name */}
                <div>
                    <input
                        type="text"
                        name="alm_last_name"
                        placeholder="Last Name"
                        onChange={handleChange}
                        value={userData.alm_last_name}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300 hover:border-green-500 focus:scale-[1.02]"
                    />
                    {errors.alm_last_name && <p className="text-red-500 text-sm mt-1">{errors.alm_last_name}</p>}
                </div>

                {/* Gender */}
                <div>
                    <select
                        name="alm_gender"
                        onChange={handleChange}
                        value={userData.alm_gender}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300 hover:border-green-500 focus:scale-[1.02]"
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    {errors.alm_gender && <p className="text-red-500 text-sm mt-1">{errors.alm_gender}</p>}
                </div>

                {/* Contact Number */}
                <div>
                    <input
                        type="text"
                        name="alm_contact_number"
                        placeholder="Contact Number"
                        onChange={handleChange}
                        value={userData.alm_contact_number}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300 hover:border-green-500 focus:scale-[1.02]"
                    />
                    {errors.alm_contact_number && <p className="text-red-500 text-sm mt-1">{errors.alm_contact_number}</p>}
                </div>
            </div>
        </motion.div>
    );
};

export default PersonalInfoStep;
