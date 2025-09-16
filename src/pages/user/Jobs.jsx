import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import formatDate from "../../utils/helper";


const Jobs = () => {

    const { user, token } = useAuth();
    const [jobs, setJobPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPost, setSelectedPost] = useState(null);

    const [postLoading, setPostLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Form State
    const [jobTitle, setJobTitle] = useState("");
    const [jobDetails, setJobDetails] = useState("");
    const [jobImage, setJobImage] = useState(null);

    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user-jobs`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });
                setJobPosts(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error("Error fetching announcements:", error);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchData();
        }
    }, [token]);

    const handleCreateJob = async (e) => {
        e.preventDefault();
        setPostLoading(true);

        const formData = new FormData();
        formData.append("job_title", jobTitle);
        formData.append("job_details", jobDetails);
        formData.append("account_id", user.id);
        if (jobImage) formData.append("job_image", jobImage);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user-jobs`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 201) {
                window.location.reload(); // Reload the page after successful action
                alert("Job created successfully!");
                setShowModal(false);
                setJobTitle("");
                setJobDetails("");
                setJobImage(null);
            }
            setPostLoading(false);

        } catch (error) {
            console.error("Error creating job:", error);
        }
    };
    return (
        <div className={`flex flex-col h-screen p-6 `}>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Job Posts</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
                >
                    + Create Job
                </button>
            </div>
            {loading ? (
                <p>Loading Job Posts...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.map((job) => (
                        <div key={job.id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                            <img className="w-full h-60 object-cover"
                                src={`${import.meta.env.VITE_STORAGE_BASE_URL}/public/storage/job_posts/${job.job_image}`}

                                alt="Job Post" />

                            <div className="p-6">
                                <h5 className="text-xl font-semibold text-gray-900 dark:text-white">{job.job_title}</h5>

                                <p className="mt-2 text-sm text-gray-700 dark:text-gray-400 line-clamp-3">
                                    {job.job_details}
                                </p>

                                <div className="mt-4 flex justify-between items-center">
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {new Date(job.created_at).toLocaleDateString()}
                                    </span>
                                    <button
                                        onClick={() => setSelectedPost(job)} // Set the clicked event as selected
                                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                                        View Event
                                    </button>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            )}

            {/* Job Creation Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-full max-w-lg p-6">
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
                                    disabled={postLoading}

                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Job Details</label>
                                <textarea
                                    value={jobDetails}
                                    onChange={(e) => setJobDetails(e.target.value)}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300 hover:border-green-500 focus:scale-[1.02]"
                                    disabled={postLoading}

                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                                <input
                                    type="file"
                                    onChange={(e) => setJobImage(e.target.files[0])}
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300 hover:border-green-500 focus:scale-[1.02]"
                                    disabled={postLoading}

                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-gray-300 rounded-lg"
                                    disabled={postLoading}

                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white p-2 w-full rounded-md hover:bg-blue-600 flex justify-center items-center"
                                    disabled={postLoading}
                                >
                                    {postLoading ? (
                                        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8H4z"></path>
                                        </svg>
                                    ) : (
                                        "Create Job"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal */}
            {selectedPost && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                            onClick={() => setSelectedPost(null)}>
                            ✖
                        </button>
                        <img className="w-full h-60 object-cover"
                            src={`${import.meta.env.VITE_STORAGE_BASE_URL}/storage/job_posts/${selectedPost.job_image}`}
                            alt="Job Post" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">{selectedPost.job_title}</h2>
                        <p className="mt-2 text-gray-700 dark:text-gray-400">{selectedPost.job_details}</p>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Job Posted Date:{formatDate(selectedPost.created_at)}

                        </p>
                        <button
                            className="mt-4 w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                            onClick={() => setSelectedPost(null)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>


    );
};

export default Jobs;
