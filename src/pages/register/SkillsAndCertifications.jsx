/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ProgressBar from "../user/Components/ProgressBar";
import { fetchTechnicalSkills, fetchSoftSkills } from '../../hooks/SkillsAndCourses';
import createApiClient from '../../api/ApiService';

const SkillsAndCertifications = ({
    userData,
    handleChange,
    errors,
    currentStepIndex,
    totalSteps,
    onSkillsUpdate
}) => {
    const [softSkills, setSoftSkills] = useState([]);
    const [loadingSoft, setLoadingSoftSkills] = useState(true);
    const [techSkills, setTechSkills] = useState([]);
    const [loadingTech, setLoadingTechSkills] = useState(true);
    const [showCustomTechInput, setShowCustomTechInput] = useState(false);
    const [customTechSkill, setCustomTechSkill] = useState("");
    const [showCustomSoftInput, setShowCustomSoftInput] = useState(false);
    const [customSoftSkill, setCustomSoftSkill] = useState("");

    const addTechnicalSkill = (skill) => {
        if (skill && !userData.technical_skills_logs.includes(skill)) {
            const updatedSkills = [...userData.technical_skills_logs, skill];
            onSkillsUpdate('technical_skills_logs', updatedSkills);
        }
    };

    const removeTechnicalSkill = (skill) => {
        const updatedSkills = userData.technical_skills_logs.filter(s => s !== skill);
        onSkillsUpdate('technical_skills_logs', updatedSkills);
    };

    const addSoftSkill = (skill) => {
        if (skill && !userData.soft_skills_logs.includes(skill)) {
            const updatedSkills = [...userData.soft_skills_logs, skill];
            onSkillsUpdate('soft_skills_logs', updatedSkills);
        }
    };

    const removeSoftSkill = (skill) => {
        const updatedSkills = userData.soft_skills_logs.filter(s => s !== skill);
        onSkillsUpdate('soft_skills_logs', updatedSkills);
    };

    const handleTechSkillSelect = (e) => {
        const value = e.target.value;
        if (value === "other") {
            setShowCustomTechInput(true);
        } else if (value) {
            setShowCustomTechInput(false);
            addTechnicalSkill(Number(value));
        }
    };

    const handleSoftSkillSelect = (e) => {
        const value = e.target.value;
        if (value === "other") {
            setShowCustomSoftInput(true);
        } else if (value) {
            setShowCustomSoftInput(false);
            addSoftSkill(Number(value));
        }
    };

    const addCustomTechSkill = () => {
        if (customTechSkill.trim()) {
            const newSkill = {
                id: Date.now(), // Temporary ID
                skill_name: customTechSkill.trim()
            };
            const updatedSkills = [...userData.custom_tech_skills, newSkill];
            onSkillsUpdate('custom_tech_skills', updatedSkills);
            setCustomTechSkill("");
            setShowCustomTechInput(false);
        }
    };

    const removeCustomTechSkill = (id) => {
        const updatedSkills = userData.custom_tech_skills.filter(s => s.id !== id);
        onSkillsUpdate('custom_tech_skills', updatedSkills);
    };

    const addCustomSoftSkill = () => {
        if (customSoftSkill.trim()) {
            const newSkill = {
                id: Date.now(), // Temporary ID
                skill_name: customSoftSkill.trim()
            };
            const updatedSkills = [...userData.custom_soft_skills, newSkill];
            onSkillsUpdate('custom_soft_skills', updatedSkills);
            setCustomSoftSkill("");
            setShowCustomSoftInput(false);
        }
    };

    const removeCustomSoftSkill = (id) => {
        const updatedSkills = userData.custom_soft_skills.filter(s => s.id !== id);
        onSkillsUpdate('custom_soft_skills', updatedSkills);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/soft-skills`
                    , {
                        headers: {
                            Accept: "application/json",
                        },
                    });
                setSoftSkills(response.data.data);
            } catch (error) {
                console.error("Error fetching soft skills:", error);
            } finally {
                setLoadingSoftSkills(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/technical-skills", {
                    headers: {
                        Accept: "application/json",
                    },
                });
                setTechSkills(response.data.data);
            } catch (error) {
                console.error("Error fetching technical skills:", error);
            } finally {
                setLoadingTechSkills(false);
            }
        };
        fetchData();
    }, []);

    return (
        <motion.div
            className="p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg w-full max-w-4xl mx-auto border border-gray-100 max-h-[80vh] overflow-y-auto"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="w-full max-w-3xl">
                <ProgressBar currentStepIndex={currentStepIndex} totalSteps={totalSteps} />
            </div>
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
                    {loadingTech ? (
                        <p>Loading skills...</p>
                    ) : (
                        <>
                            <select
                                onChange={handleTechSkillSelect}
                                className="w-full p-2 border rounded-md mt-2"
                                value=""
                            >
                                <option value="">Select a skill</option>
                                {techSkills.map((skill) => (
                                    <option key={skill.id} value={skill.id}>
                                        {skill.tch_skill_name}
                                    </option>
                                ))}
                                <option value="other">Other (Not listed)</option>
                            </select>

                            {showCustomTechInput && (
                                <div className="flex gap-2 mt-2">
                                    <input
                                        type="text"
                                        value={customTechSkill}
                                        onChange={(e) => setCustomTechSkill(e.target.value)}
                                        placeholder="Enter your technical skill"
                                        className="flex-1 p-2 border rounded-md"
                                    />
                                    <button
                                        type="button"
                                        onClick={addCustomTechSkill}
                                        className="px-3 py-2 bg-green-500 text-white rounded"
                                    >
                                        Add
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowCustomTechInput(false)}
                                        className="px-3 py-2 bg-gray-500 text-white rounded"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}

                            {/* Display selected predefined technical skills */}
                            {userData.technical_skills_logs.map((skillId, index) => {
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

                            {/* Display custom technical skills */}
                            {userData.custom_tech_skills.map((skill, index) => (
                                <div key={index} className="flex items-center gap-2 mt-2">
                                    <span className="p-2 bg-gray-200 rounded-md">{skill.skill_name}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeCustomTechSkill(skill.id)}
                                        className="px-3 py-2 bg-red-500 text-white rounded"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </>
                    )}
                </div>

                {/* Soft Skills Selection */}
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Soft Skills</h3>
                    {loadingSoft ? (
                        <p>Loading skills...</p>
                    ) : (
                        <>
                            <select
                                onChange={handleSoftSkillSelect}
                                className="w-full p-2 border rounded-md mt-2"
                                value=""
                            >
                                <option value="">Select a skill</option>
                                {softSkills.map((skill) => (
                                    <option key={skill.id} value={skill.id}>
                                        {skill.sft_skill_name}
                                    </option>
                                ))}
                                <option value="other">Other (Not listed)</option>
                            </select>

                            {showCustomSoftInput && (
                                <div className="flex gap-2 mt-2">
                                    <input
                                        type="text"
                                        value={customSoftSkill}
                                        onChange={(e) => setCustomSoftSkill(e.target.value)}
                                        placeholder="Enter your soft skill"
                                        className="flex-1 p-2 border rounded-md"
                                    />
                                    <button
                                        type="button"
                                        onClick={addCustomSoftSkill}
                                        className="px-3 py-2 bg-green-500 text-white rounded"
                                    >
                                        Add
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowCustomSoftInput(false)}
                                        className="px-3 py-2 bg-gray-500 text-white rounded"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}

                            {/* Display selected predefined soft skills */}
                            {userData.soft_skills_logs.map((skillId, index) => {
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

                            {/* Display custom soft skills */}
                            {userData.custom_soft_skills.map((skill, index) => (
                                <div key={index} className="flex items-center gap-2 mt-2">
                                    <span className="p-2 bg-gray-200 rounded-md">{skill.skill_name}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeCustomSoftSkill(skill.id)}
                                        className="px-3 py-2 bg-red-500 text-white rounded"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default SkillsAndCertifications;