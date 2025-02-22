import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

const Announcements = () => {
    const { user, token } = useAuth();
    const [jobsPosts, setJobPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    // Form State
    const [jobTitle, setJobTitle] = useState("");
    const [jobDetails, setJobDetails] = useState("");
    const [jobImage, setJobImage] = useState(null);

    useEffect(() => {
        const fetchJobPost = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/jobs", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });
                setJobPosts(response.data.data);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchJobPost();
        }
    }, [token]);

    // Handle Form Submission
    const handleCreateJob = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("job_title", jobTitle);
        formData.append("job_details", jobDetails);
        formData.append("account_id", user.id);
        if (jobImage) formData.append("job_image", jobImage);

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/jobs", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 201) {
                alert("Job created successfully!");
                setShowModal(false);
                setJobTitle("");
                setJobDetails("");
                setJobImage(null);
            }
        } catch (error) {
            console.error("Error creating job:", error);
        }
    };


    return (
        <div className={`flex flex-col h-screen p-6 ${showModal ? "backdrop-blur-md" : ""}`}>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Job Posts</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
                >
                    + Create Job
                </button>
            </div>

            <div className="p-4 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Announcements</h2>
                {loading ? (
                    <p className="text-gray-500">Loading job posts data...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="px-6 py-3 text-left">Job Title</th>
                                    <th className="px-6 py-3 text-left">Job Details</th>
                                    <th className="px-6 py-3 text-left">Job Image</th>
                                    <th className="px-6 py-3 text-left">Date Posted</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobsPosts.length > 0 ? (
                                    jobsPosts.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200 transition`}
                                        >
                                            <td className="px-6 py-4 text-gray-700">{item.job_title || "N/A"}</td>
                                            <td className="px-6 py-4 text-gray-700">{item.job_details || "N/A"}</td>
                                            <td className="px-6 py-4">
                                                {item.job_image ? (
                                                    <img
                                                        src={`http://127.0.0.1:8000/storage/job_posts/${item.job_image}`}
                                                        alt="Job Post"
                                                        className="w-20 h-20 object-cover rounded-md shadow-sm"
                                                    />
                                                ) : (
                                                    <span className="text-gray-400">No Image</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {new Date(item.created_at).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center p-4 text-gray-500">
                                            No job data found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Job Creation Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-25 backdrop-blur-md">

                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 border border-gray-300">
                        <h2 className="text-lg font-semibold mb-4">Create Job</h2>
                        <form onSubmit={handleCreateJob} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Job Title</label>
                                <input
                                    type="text"
                                    value={jobTitle}
                                    onChange={(e) => setJobTitle(e.target.value)}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300 hover:border-green-500 focus:scale-[1.02]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Job Details</label>
                                <textarea
                                    value={jobDetails}
                                    onChange={(e) => setJobDetails(e.target.value)}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300 hover:border-green-500 focus:scale-[1.02]"
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                                <input
                                    type="file"
                                    onChange={(e) => setJobImage(e.target.files[0])}
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300 hover:border-green-500 focus:scale-[1.02]"
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-gray-300 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Announcements;
