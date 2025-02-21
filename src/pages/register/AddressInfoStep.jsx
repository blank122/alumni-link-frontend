/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const AddressInfoStep = ({ userData, handleChange, errors }) => {
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
                <h2 className="text-2xl font-semibold text-gray-700">Address Information</h2>
            </div>

            <div className="space-y-4">
                {/* Full Address */}
                <div>
                    <input
                        type="text"
                        name="add_full_address"
                        placeholder="Full Address"
                        onChange={handleChange}
                        value={userData.add_full_address}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
                    />
                    {errors.add_full_address && <p className="text-red-500 text-sm mt-1">{errors.add_full_address}</p>}
                </div>

                {/* Latitude & Longitude (Grid Layout) */}
                <div className="grid grid-cols-2 gap-3">
                    {/* Latitude */}
                    <div>
                        <input
                            type="text"
                            name="add_lat"
                            placeholder="Latitude"
                            onChange={handleChange}
                            value={userData.add_lat}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
                        />
                        {errors.add_lat && <p className="text-red-500 text-sm mt-1">{errors.add_lat}</p>}
                    </div>

                    {/* Longitude */}
                    <div>
                        <input
                            type="text"
                            name="add_long"
                            placeholder="Longitude"
                            onChange={handleChange}
                            value={userData.add_long}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
                        />
                        {errors.add_long && <p className="text-red-500 text-sm mt-1">{errors.add_long}</p>}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AddressInfoStep;
