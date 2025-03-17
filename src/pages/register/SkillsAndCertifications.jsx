/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SkillsAndCertifications = ({ userData, handleChange, errors }) => {


    return (
        <motion.div
            className="p-6 bg-white rounded-2xl shadow-lg w-full max-w-md mx-auto border border-gray-200"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Skills and Certifications</h2>

            <div className="space-y-4">
                {/* Course Selection */}
                {/* <div>
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
                </div> */}

                <div>
                    <div>
                        <label htmlFor="cert_serial_no" className="block text-sm font-medium text-gray-700">
                            Certificate Serial No
                        </label>
                        <input
                            type="text"
                            id="cert_serial_no"
                            name="cert_serial_no"
                            placeholder="e.g., 9mkd-s4ar"
                            onChange={handleChange}
                            value={userData.cert_serial_no || ""}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300"
                        />
                        {errors.cert_serial_no && <p className="text-red-500 text-xs mt-1">{errors.cert_serial_no}</p>}
                    </div>

                    {/* Institution Name */}
                    <div>
                        <label htmlFor="cert_name" className="block text-sm font-medium text-gray-700">
                            Certificate Name
                        </label>
                        <input
                            type="text"
                            id="cert_name"
                            name="cert_name"
                            placeholder="e.g., ITS Networking, CISCO Cybersecurity Expert"
                            onChange={handleChange}
                            value={userData.cert_name || ""}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300"
                        />
                        {errors.cert_name && <p className="text-red-500 text-xs mt-1">{errors.cert_name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                        <input
                            type="file"
                            onChange={(e) => handleChange({
                                target: {
                                    name: "cert_file",
                                    value: e.target.files[0]
                                }
                            })} className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300 hover:border-green-500 focus:scale-[1.02]"

                        />
                    </div>

                    <div>
                        <label htmlFor="cert_awarded" className="block text-sm font-medium text-gray-700">
                            Certification awarded
                        </label>
                        <DatePicker
                            id="cert_awarded"
                            selected={userData.cert_awarded ? new Date(userData.cert_awarded) : null}
                            onChange={(date) => handleChange({
                                target: {
                                    name: "cert_awarded",
                                    value: date ? date.getFullYear().toString() : "" // Convert to string
                                }
                            })}
                            showYearPicker
                            dateFormat="yyyy"
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300"
                            placeholderText="Select Year"
                        />
                        {errors.cert_awarded && <p className="text-red-500 text-xs mt-1">{errors.cert_awarded}</p>}
                    </div>

                </div>

                {/* Master's Degree Checkbox */}


            </div>
        </motion.div>
    );
};

export default SkillsAndCertifications;
