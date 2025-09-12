import { useAuth } from "../../../contexts/AuthContext";
import { fetchTechnicalSkills, fetchSoftSkills } from "../../../hooks/SkillsAndCourses";
import createApiClient from "../../../api/ApiService";
import { useEffect, useState } from "react";

const SkillsModal = ({ isOpen, onClose, skillType }) => {
    const { user, token } = useAuth();
    const { softSkills, softLoad } = fetchSoftSkills(token);
    const { techSkills, techLoad } = fetchTechnicalSkills(token);

    const [isLoading, setIsLoading] = useState(false);
    const [skills, setSkills] = useState([]); // fetched skills
    const [selectedSkill, setSelectedSkill] = useState(""); // dropdown selection
    const [selectedSkills, setSelectedSkills] = useState([]); // chosen skills list

    // fetch skills on mount based on skillType
    useEffect(() => {
        if (!isOpen) return;

        const loadSkills = async () => {
            try {
                let data = [];
                if (skillType === "softSkills") {
                    data = softSkills;
                } else if (skillType === "techSkills") {
                    data = techSkills;
                }
                setSkills(data);
            } catch (error) {
                console.error("Error fetching skills:", error);
            }
        };

        loadSkills();
    }, [isOpen, skillType]);

    const handleAddSkill = () => {
        if (selectedSkill && !selectedSkills.includes(selectedSkill)) {
            setSelectedSkills([...selectedSkills, selectedSkill]);
            setSelectedSkill("");
        }
    };

    const handleRemoveSkill = (skill) => {
        setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    };

    const handleSave = async () => {
        setIsLoading(true);

        // 🚧 later: send `selectedSkills` to backend
        console.log("Saving skills:", selectedSkills);

        setTimeout(() => {
            setIsLoading(false);
            onClose();
        }, 1000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-lg p-6 max-h-[95vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">
                    {skillType === "softSkills" ? "Add Soft Skills" : "Add Technical Skills"}
                </h2>

                {/* Dropdown */}
                <div className="mb-4">
                    <label className="block font-medium text-gray-700 mb-1">
                        Select {skillType === "softSkills" ? "Soft Skill" : "Technical Skill"}
                    </label>
                    <div className="flex space-x-2">
                        <select
                            value={selectedSkill}
                            onChange={(e) => setSelectedSkill(e.target.value)}
                            className="border rounded-md px-3 py-2 flex-grow"
                        >
                            <option value="">-- Select a skill --</option>
                            {skills.map((skill) => {
                                const skillName =
                                    skillType === "softSkills"
                                        ? skill.sft_skill_name
                                        : skill.tch_skill_name;

                                return (
                                    <option key={skill.id} value={skillName}>
                                        {skillName}
                                    </option>
                                );
                            })}
                        </select>

                        <button
                            onClick={handleAddSkill}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Add
                        </button>
                    </div>

                </div>

                {/* Display selected skills like LinkedIn */}
                <div className="mb-4">
                    <label className="block font-medium text-gray-700 mb-1">Selected Skills</label>
                    <div className="flex flex-wrap gap-2">
                        {selectedSkills.map((skill) => (
                            <span
                                key={skill}
                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
                            >
                                {skill}
                                <button
                                    onClick={() => handleRemoveSkill(skill)}
                                    className="ml-2 text-red-500 hover:text-red-700"
                                >
                                    ✕
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isLoading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        {isLoading ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SkillsModal;
