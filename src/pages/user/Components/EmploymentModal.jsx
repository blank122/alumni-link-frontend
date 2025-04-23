import React, { useState } from "react";

function EmploymentModal({ isOpen, onClose, onSave }) {
    const [employmentType, setEmploymentType] = useState("full_time");
    const [newJob, setNewJob] = useState({
        job_title: "",
        company_name: "",
        start_date: "",
        end_date: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewJob((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEmploymentTypeChange = (e) => {
        const type = e.target.value;
        setEmploymentType(type);
        setNewJob((prev) => ({
            ...prev,
            company_name: type === "freelance" ? "Self-employed" : "",
        }));
    };

    const handleSave = () => {
        onSave(newJob);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-lg p-6">
                <h2 className="text-xl font-bold mb-4">Add Employment</h2>

                <div className="mb-4">
                    <label className="block font-medium text-gray-700">Employment Type</label>
                    <select
                        value={employmentType}
                        onChange={handleEmploymentTypeChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="full_time">Full-time Employment</option>
                        <option value="freelance">Freelancing/Part-time</option>
                    </select>
                </div>

                {/* Job Title */}
                <div className="mb-4">
                    <label className="block font-medium text-gray-700">Job Title</label>
                    <input
                        type="text"
                        name="job_title"
                        value={newJob.job_title}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Company Name (pre-filled and readonly if freelancing) */}
                <div className="mb-4">
                    <label className="block font-medium text-gray-700">Company Name</label>
                    <input
                        type="text"
                        name="company_name"
                        value={newJob.company_name}
                        onChange={handleInputChange}
                        readOnly={employmentType === "freelance"}
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                    />
                </div>

                {/* Start Date */}
                <div className="mb-4">
                    <label className="block font-medium text-gray-700">Start Date</label>
                    <input
                        type="date"
                        name="start_date"
                        value={newJob.start_date}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* End Date */}
                <div className="mb-4">
                    <label className="block font-medium text-gray-700">End Date</label>
                    <input
                        type="date"
                        name="end_date"
                        value={newJob.end_date}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EmploymentModal;
