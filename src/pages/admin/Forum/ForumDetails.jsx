import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import axios from "axios";

const ForumDetails = () => {
    const { id } = useParams();
    const [forum, setForum] = useState(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [discussionTitle, setDiscussionTitle] = useState("");
    const [discussionText, setDiscussionText] = useState("");
    const { user, token } = useAuth();

    useEffect(() => {
        const fetchForumDetails = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/forums/${id}`);
                setForum(response.data.data);
            } catch (error) {
                console.error("Error fetching forum:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchForumDetails();
    }, [id]);

    const handleCreatePost = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", discussionTitle);
        formData.append("body", discussionText);
        formData.append("account_id", user.id);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/forums/${id}/threads`,
                formData,
                { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
            );
            if (response.status === 201) {
                alert("Discussion created successfully!");
                setOpen(false);
                setDiscussionTitle("");
                setDiscussionText("");
                setForum({ ...forum, threads: [response.data, ...forum.threads] }); // Add new thread
            }
        } catch (error) {
            console.error("Error creating discussion:", error);
        }
    };

    if (loading) return <p className="text-center text-gray-600 mt-10">Loading...</p>;
    if (!forum) return <p className="text-center text-red-500 mt-10">Forum not found.</p>;

    return (
        <div className="container mx-auto p-6">
            {/* Breadcrumbs */}
            <nav className="text-sm text-gray-500 mb-6">
                <Link to="/admin/forums" className="hover:underline text-blue-500">Forums</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-700">{forum.frm_title}</span>
            </nav>

            {/* Forum Details */}
            <div className="bg-white dark:bg-gray-900 shadow-md rounded-xl p-6 mb-6 border border-gray-200 dark:border-gray-700">
                <h1 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">{forum.frm_title}</h1>
                <p className="text-gray-600 dark:text-gray-300">{forum.frm_description}</p>
            </div>

            {/* Discussion Section */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Discussions</h2>
                <button
                    onClick={() => setOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-all duration-300"
                >
                    + Start Discussion
                </button>
            </div>

            {/* Threads */}
            {forum.threads.length > 0 ? (
                <div className="space-y-4">
                    {forum.threads.map((thread) => (
                        <div
                            key={thread.id}
                            className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{thread.title}</h3>
                            <p className="text-gray-700 dark:text-gray-300 mt-1">{thread.text}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-center mt-6">No discussions available.</p>
            )}

            {/* Modal for Creating Discussion */}
            {open && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-2xl w-96 border border-gray-300 dark:border-gray-700">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
                            📝 Start a New Discussion
                        </h2>
                        <form onSubmit={handleCreatePost} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Discussion Title"
                                value={discussionTitle}
                                onChange={(e) => setDiscussionTitle(e.target.value)}
                                className="w-full border border-gray-300 dark:border-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300"
                                required
                            />
                            <textarea
                                placeholder="Write your discussion..."
                                value={discussionText}
                                onChange={(e) => setDiscussionText(e.target.value)}
                                className="w-full border border-gray-300 dark:border-gray-700 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300"
                                rows={4}
                                required
                            ></textarea>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                >
                                    Post Discussion
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForumDetails;
