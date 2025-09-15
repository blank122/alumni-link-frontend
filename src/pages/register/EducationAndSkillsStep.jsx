/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ProgressHeader from "../../components/ProgressHeader";

const EducationAndSkillsStep = ({ userData, handleChange, errors, currentStepIndex, totalSteps, onSkillsUpdate }) => {
    const [isAttendingMasters, setIsAttendingMasters] = useState(false);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCerts, setShowCerts] = useState(false);

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
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/technical-skills`, {
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
            className="p-6 bg-white rounded-2xl shadow-lg w-full max-w-md mx-auto border border-gray-200"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Progress Header */}
            <ProgressHeader
                currentStepIndex={currentStepIndex}
                totalSteps={totalSteps}
                title="Education and Skills"
            />

            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                🎓 Alumni Background
            </h2>

            <div className="space-y-4">
                {/* Alumni ID */}
                <div>
                    <label
                        htmlFor="course_id"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Alumni ID or (Student ID)
                    </label>
                    <input
                        type="text"
                        name="alm_id"
                        placeholder="Eg 564512"
                        onChange={handleChange}
                        value={userData.alm_id}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none placeholder-gray-400"
                    />
                    {errors.alm_id && (
                        <p className="text-red-500 text-xs">{errors.alm_id}</p>
                    )}
                </div>

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
                    <label
                        htmlFor="year_graduated"
                        className="block text-sm font-medium text-gray-700"
                    >
                        School Year Graduated
                    </label>
                    <select
                        id="year_graduated"
                        name="year_graduated"
                        value={userData.year_graduated || ""}
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
                    {errors.year_graduated && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.year_graduated}
                        </p>
                    )}
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
                    <label
                        htmlFor="masters_attending"
                        className="text-sm font-medium text-gray-700"
                    >
                        Currently attending a Master&apos;s Degree?
                    </label>
                </div>

                {/* Conditional Fields for Master's Degree */}
                <AnimatePresence>
                    {isAttendingMasters && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                        >
                            {/* Type of Master's Degree */}
                            <div>
                                <label
                                    htmlFor="masters_type"
                                    className="block text-sm font-medium text-gray-700"
                                >
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
                                {errors.masters_type && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.masters_type}
                                    </p>
                                )}
                            </div>

                            {/* Institution Name */}
                            <div>
                                <label
                                    htmlFor="masters_institution"
                                    className="block text-sm font-medium text-gray-700"
                                >
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
                                {errors.masters_institution && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.masters_institution}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Certifications Toggle */}
                <div className="flex items-center space-x-2 mt-6">
                    <input
                        type="checkbox"
                        id="has_certifications"
                        checked={showCerts}
                        onChange={(e) => setShowCerts(e.target.checked)}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label
                        htmlFor="has_certifications"
                        className="text-sm font-medium text-gray-700"
                    >
                        Do you want to add certifications? (Optional)
                    </label>
                </div>

                {/* Certifications Section */}
                <AnimatePresence>
                    {showCerts && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                        >
                            <h2 className="text-2xl font-bold text-gray-800 text-center">
                                📜 Certifications
                            </h2>

                            {/* Certificate Serial No */}
                            <div>
                                <label
                                    htmlFor="cert_serial_no"
                                    className="block text-sm font-medium text-gray-700"
                                >
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
                            </div>

                            {/* Certificate Name */}
                            <div>
                                <label
                                    htmlFor="cert_name"
                                    className="block text-sm font-medium text-gray-700"
                                >
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
                            </div>

                            {/* Upload Certificate */}
                            <div>
                                <label
                                    htmlFor="cert_file"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Upload Certificate (PDF or Image)
                                </label>
                                <input
                                    type="file"
                                    id="cert_file"
                                    name="cert_file"
                                    accept=".pdf,.jpg,.png"
                                    onChange={handleChange}
                                    className="block w-full text-sm text-gray-600 border rounded-lg cursor-pointer"
                                />
                            </div>

                            {/* Certification Awarded */}
                            <div>
                                <label
                                    htmlFor="cert_awarded"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Certification Awarded
                                </label>
                                <DatePicker
                                    id="cert_awarded"
                                    selected={
                                        userData.cert_awarded ? new Date(userData.cert_awarded) : null
                                    }
                                    onChange={(date) =>
                                        handleChange({
                                            target: {
                                                name: "cert_awarded",
                                                value: date ? date.getFullYear().toString() : "",
                                            },
                                        })
                                    }
                                    showYearPicker
                                    dateFormat="yyyy"
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300"
                                    placeholderText="Select Year"
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Skills Section */}
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    💻 Skills
                </h2>

                {/* Technical Skills */}
                <div>
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

                            {/* Chips for skills */}
                            <div className="flex flex-wrap gap-2 mt-3">
                                {userData.technical_skills_logs.map((skillId, index) => {
                                    const skill = techSkills.find(
                                        (s) => Number(s.id) === Number(skillId)
                                    );
                                    return (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full flex items-center gap-2"
                                        >
                                            {skill ? skill.tch_skill_name : "Unknown Skill"}
                                            <button
                                                type="button"
                                                onClick={() => removeTechnicalSkill(skillId)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                ✕
                                            </button>
                                        </span>
                                    );
                                })}

                                {userData.custom_tech_skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full flex items-center gap-2"
                                    >
                                        {skill.skill_name}
                                        <button
                                            type="button"
                                            onClick={() => removeCustomTechSkill(skill.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            ✕
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Soft Skills */}
                <div>
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

                            {/* Chips for skills */}
                            <div className="flex flex-wrap gap-2 mt-3">
                                {userData.soft_skills_logs.map((skillId, index) => {
                                    const skill = softSkills.find(
                                        (s) => Number(s.id) === Number(skillId)
                                    );
                                    return (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full flex items-center gap-2"
                                        >
                                            {skill ? skill.sft_skill_name : "Unknown Skill"}
                                            <button
                                                type="button"
                                                onClick={() => removeSoftSkill(skillId)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                ✕
                                            </button>
                                        </span>
                                    );
                                })}

                                {userData.custom_soft_skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full flex items-center gap-2"
                                    >
                                        {skill.skill_name}
                                        <button
                                            type="button"
                                            onClick={() => removeCustomSoftSkill(skill.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            ✕
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default EducationAndSkillsStep;
