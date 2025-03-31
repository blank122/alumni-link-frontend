/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const SkillsAndCertifications = ({ userData,
    handleChange,
    techSkills,
    addTechnicalSkill,
    removeTechnicalSkill,
    loadingTech,
    softSkills,
    addSoftSkill,
    removeSoftSkill,
    loadingSoft,
    errors }) => {


    return (
        <motion.div
            className="p-6 bg-white rounded-2xl shadow-lg w-full max-w-md mx-auto border border-gray-200"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Skills and Certifications</h2>

            <div className="space-y-4">
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
                        <label htmlFor="cert_file" className="block text-sm font-medium text-gray-700 mb-1">
                            Upload Certificate (PDF or Image)
                        </label>
                        <div className="relative">
                            <label
                                htmlFor="cert_file"
                                className={`flex items-center justify-between w-full p-3 border ${errors.cert_file ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-green-400 focus-within:outline-none transition-all duration-300 hover:border-gray-400 cursor-pointer`}
                            >
                                <div className="flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-gray-500 mr-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                        />
                                    </svg>
                                    <span className="text-sm text-gray-600 truncate max-w-[180px]">
                                        {userData.cert_file ? userData.cert_file.name : "No File Selected"}
                                    </span>
                                </div>  
                            </label>
                            <input
                                type="file"
                                id="cert_file"
                                name="cert_file"
                                accept=".pdf,.jpg,.png"
                                onChange={handleChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                        {errors.cert_file && <p className="text-red-500 text-xs mt-1">{errors.cert_file}</p>}
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
                {/* Technical Skills Selection */}
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Technical Skills</h3>

                    {/* Loading State */}
                    {loadingTech ? (
                        <p>Loading skills...</p>
                    ) : (
                        <>
                            <select
                                onChange={(e) => addTechnicalSkill(Number(e.target.value))} // Store ID, not name
                                className="w-full p-2 border rounded-md mt-2"
                            >
                                <option value="">Select a skill</option>
                                {techSkills.map((skill) => (
                                    <option key={skill.id} value={skill.id}> {/* Store ID here */}
                                        {skill.tch_skill_name}
                                    </option>
                                ))}
                            </select>


                            {/* Display Selected Skills */}
                            {userData.technical_skills_logs.map((skillId, index) => {
                                // Convert IDs to the same type to avoid mismatches
                                const skill = techSkills.find(s => Number(s.id) === Number(skillId));

                                return (
                                    <div key={index} className="flex items-center gap-2 mt-2">
                                        <span className="p-2 bg-gray-200 rounded-md">{skill ? skill.tch_skill_name : "Unknown Skill"}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeTechnicalSkill(skillId)}
                                            className="px-3 py-2 bg-red-500 text-white rounded"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                );
                            })}


                        </>
                    )}
                </div>

                {/* soft skills */}
                {/* Technical Skills Selection */}
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Soft Skills</h3>

                    {/* Loading State */}
                    {loadingSoft ? (
                        <p>Loading skills...</p>
                    ) : (
                        <>
                            <select
                                onChange={(e) => addSoftSkill(Number(e.target.value))} // Store ID, not name
                                className="w-full p-2 border rounded-md mt-2"
                            >
                                <option value="">Select a skill</option>
                                {softSkills.map((skill) => (
                                    <option key={skill.id} value={skill.id}>
                                        {skill.sft_skill_name}
                                    </option>
                                ))}
                            </select>

                            {/* Display Selected Skills */}
                            {userData.soft_skills_logs.map((skillId, index) => {
                                // Convert IDs to the same type to avoid mismatches
                                const skill = softSkills.find(s => Number(s.id) === Number(skillId));

                                return (
                                    <div key={index} className="flex items-center gap-2 mt-2">
                                        <span className="p-2 bg-gray-200 rounded-md">{skill ? skill.sft_skill_name : "Unknown Skill"}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeSoftSkill(skillId)}
                                            className="px-3 py-2 bg-red-500 text-white rounded"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                );
                            })}
                        </>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default SkillsAndCertifications;
