import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";


const Jobs = () => {

    const { token } = useAuth();
    const [jobs, setJobPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        if ( !token) return;

        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/user-jobs", {
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
    return (
        <div className={`flex flex-col h-screen p-6 `}>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">💼 Job Posts</h1>
            </div>
            {loading ? (
                <p>Loading Job Posts...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.map((job) => (
                        <div key={job.id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                            <img className="w-full h-60 object-cover" src={`http://127.0.0.1:8000/storage/job_posts/${job.job_image}`} alt="Job Post" />

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

            {/* Modal */}
            {selectedPost && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                            onClick={() => setSelectedPost(null)}>
                            ✖
                        </button>
                        <img className="w-full h-60 object-cover" src={`http://127.0.0.1:8000/storage/job_posts/${selectedPost.job_image}`} alt="Job Post" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">{selectedPost.job_title}</h2>
                        <p className="mt-2 text-gray-700 dark:text-gray-400">{selectedPost.job_details}</p>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Job Posted Date: {new Date(selectedPost.created_at).toLocaleDateString()}
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
