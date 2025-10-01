import { useAuth } from "../../../contexts/AuthContext";
import { fetchTechnicalSkills, fetchSoftSkills } from "../../../hooks/SkillsAndCourses";
import createApiClient from "../../../api/ApiService";
import { useEffect, useState } from "react";

const SkillsModal = ({ key, isOpen, onClose, skillType }) => {
    const { user, token } = useAuth();
    const { softSkills, softLoad } = fetchSoftSkills(token);
    const { techSkills, techLoad } = fetchTechnicalSkills(token);

    const [isLoading, setIsLoading] = useState(false);
    const [skills, setSkills] = useState([]); // fetched skills
    const [selectedSkill, setSelectedSkill] = useState(""); // dropdown selection
    const [selectedSkills, setSelectedSkills] = useState([]); // chosen skills list
    const [customSkillInput, setCustomSkillInput] = useState(""); // custom skill input
    const [showCustomInput, setShowCustomInput] = useState(false); // toggle custom input

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
        if (selectedSkill && !selectedSkills.some(skill => skill.name === selectedSkill)) {
            // Add existing skill from dropdown
            const skillData = skills.find(skill => {
                const skillName = skillType === "softSkills"
                    ? skill.sft_skill_name
                    : skill.tch_skill_name;
                return skillName === selectedSkill;
            });

            setSelectedSkills([...selectedSkills, {
                id: skillData.id,
                name: selectedSkill,
                isCustom: false
            }]);
            setSelectedSkill("");
        }
    };

    const handleAddCustomSkill = () => {
        if (customSkillInput.trim() && !selectedSkills.some(skill => skill.name === customSkillInput.trim())) {
            // Generate a simple incremental ID for custom skills
            const customId = selectedSkills.filter(skill => skill.isCustom).length + 1;

            setSelectedSkills([...selectedSkills, {
                id: customId,
                name: customSkillInput.trim(),
                isCustom: true
            }]);
            setCustomSkillInput("");
            setShowCustomInput(false);
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setSelectedSkills(selectedSkills.filter((skill) => skill.name !== skillToRemove.name));
    };

    const handleSave = async () => {
        setIsLoading(true);
        try {
            // Separate regular skills and custom skills
            const regularSkills = selectedSkills.filter(skill => !skill.isCustom);
            const customSkills = selectedSkills.filter(skill => skill.isCustom);

            const payload = {
                alumni_id: user?.alumni_id, // ✅ Add user id here
                // Regular skills (existing format)
                [skillType]: regularSkills.map(skill => ({
                    id: skill.id,
                    name: skill.name
                })),
                // Custom skills with new naming convention
                [skillType === "softSkills" ? "custom_soft_skills" : "custom_tech_skills"]: customSkills.map(skill => ({
                    id: skill.id, // This will be 1, 2, 3, etc.
                    name: skill.name
                }))
            };



            console.log("Saving skills JSON:", JSON.stringify(payload, null, 2));

            // TODO: Replace with actual API call
            // await apiClient.post('/save-skills', payload);
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/update-skills/`
                , {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                });

            const result = await response.json();
            console.log("Server response:", result);

            alert("Skills updated successfully!");
            onClose();
            window.location.reload();
        } catch (error) {
            console.error("Error saving skills:", error);
            alert("Error saving skills. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Reset form when modal closes
    useEffect(() => {
        if (!isOpen) {
            setSelectedSkills([]);
            setSelectedSkill("");
            setCustomSkillInput("");
            setShowCustomInput(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-lg p-6 max-h-[95vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">
                    {skillType === "softSkills" ? "Add Soft Skills" : "Add Technical Skills"}
                </h2>

                {/* Dropdown for existing skills */}
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
                            disabled={!selectedSkill}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300"
                        >
                            Add
                        </button>
                    </div>
                </div>

                {/* Custom skill section */}
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <label className="block font-medium text-gray-700">
                            Add Custom Skill
                        </label>
                        {!showCustomInput && (
                            <button
                                onClick={() => setShowCustomInput(true)}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                                + Add Custom
                            </button>
                        )}
                    </div>

                    {showCustomInput && (
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={customSkillInput}
                                onChange={(e) => setCustomSkillInput(e.target.value)}
                                placeholder={`Enter custom ${skillType === "softSkills" ? "soft" : "technical"} skill`}
                                className="border rounded-md px-3 py-2 flex-grow"
                                onKeyPress={(e) => e.key === 'Enter' && handleAddCustomSkill()}
                            />
                            <button
                                onClick={handleAddCustomSkill}
                                disabled={!customSkillInput.trim()}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-300"
                            >
                                Add
                            </button>
                            <button
                                onClick={() => {
                                    setShowCustomInput(false);
                                    setCustomSkillInput("");
                                }}
                                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>

                {/* Display selected skills */}
                <div className="mb-4">
                    <label className="block font-medium text-gray-700 mb-1">Selected Skills</label>
                    <div className="flex flex-wrap gap-2">
                        {selectedSkills.map((skill) => (
                            <span
                                key={`${skill.name}-${skill.id}`}
                                className={`px-3 py-1 rounded-full text-sm flex items-center ${skill.isCustom
                                    ? "bg-green-100 text-green-800"
                                    : "bg-blue-100 text-blue-800"
                                    }`}
                            >
                                {skill.name}
                                {skill.isCustom && (
                                    <span className="ml-1 text-xs opacity-75">(custom)</span>
                                )}
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
                        disabled={isLoading || selectedSkills.length === 0}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300"
                    >
                        {isLoading ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SkillsModal;