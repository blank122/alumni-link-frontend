import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

const Jobs = () => {
    const { token } = useAuth();
    const [jobsPosts, setJobPosts] = useState([]);
    const [loading, setLoading] = useState(true);

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
                console.error("Error fetching job posts:", error);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchJobPost();
        }
    }, [token]);

    return (
        <div className="flex flex-col min-h-screen p-6 bg-gray-100">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to Job Posts</h1>
            <div className="p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Available Job Listings</h2>
                {loading ? (
                    <p className="text-gray-500">Loading job posts...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse shadow-md bg-white rounded-lg">
                            <thead>
                                <tr className="bg-blue-600 text-white text-left">
                                    <th className="px-6 py-3">Job Title</th>
                                    <th className="px-6 py-3">Details</th>
                                    <th className="px-6 py-3">Image</th>
                                    <th className="px-6 py-3">Date Posted</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobsPosts.length > 0 ? (
                                    jobsPosts.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-200 transition`}
                                        >
                                            <td className="px-6 py-4 text-gray-700 font-medium">{item.job_title || "N/A"}</td>
                                            <td className="px-6 py-4 text-gray-600">{item.job_details || "N/A"}</td>
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

                                            <td className="px-6 py-4 text-gray-600">
                                                {new Date(item.created_at).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center p-4 text-gray-500">No job posts found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Jobs;
