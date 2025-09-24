import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Import icons (using react-icons - you may need to install: npm install react-icons)
import {
    FaComments,
    FaPlus,
    FaUserCircle,
    FaCalendarAlt,
    FaComment,
    FaEye,
    FaHeart,
    FaPaperPlane,
    FaTimes
} from "react-icons/fa";

const Forums = () => {
    const { user, token } = useAuth();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [forumTitle, setForumTitle] = useState("");
    const [forumDescription, setForumDescription] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/forums`, {
                    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
                });
                if (response.data?.data) {
                    setData(response.data.data);
                } else setData([]);
            } catch (error) {
                console.error("Error fetching data:", error);
                setData([]);
            } finally {
                setLoading(false);
            }
        };
        if (token) fetchData();
    }, [token]);

    const handleCreatePost = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", forumTitle);
        formData.append("description", forumDescription);
        formData.append("account_id", user.id);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/forums`, formData, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
            });
            if (response.status === 201) {
                alert("Forum created successfully!");
                setShowModal(false);
                setForumTitle("");
                setForumDescription("");
                setData([response.data, ...data]);
            }
        } catch (error) {
            console.error("Error creating forum:", error);
        }
    };

    // Mock function to get comment count (replace with actual API call if available)
    const getCommentCount = (forumId) => {
        return Math.floor(Math.random() * 15); // Random number for demo
    };

    // Mock function to get view count (replace with actual API call if available)
    const getViewCount = (forumId) => {
        return Math.floor(Math.random() * 100);
    };

    return (
        <div className="container mx-auto py-8 px-4 max-w-6xl">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
                        <FaComments className="text-2xl text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-black-800 dark:text-white">Discussion Forums</h1>
                        <p className="text-gray-600 dark:text-gray-400">Join the conversation with alumni community</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300 font-medium group"
                >
                    <FaPlus className="group-hover:rotate-90 transition-transform duration-300" />
                    Create New Thread
                </button>
            </div>

            {/* Loading */}
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : (
                <div className="space-y-4">
                    {data.length > 0 ? (
                        data.map((forum) => {
                            const firstName = forum.account?.alumni?.alm_first_name || "Unknown";
                            const lastName = forum.account?.alumni?.alm_last_name || "";
                            const fullName = `${firstName} ${lastName}`.trim();
                            const commentCount = getCommentCount(forum.id);
                            const viewCount = getViewCount(forum.id);

                            return (
                                <div
                                    key={forum.id}
                                    onClick={() => navigate(`/admin/forums/${forum.id}`)}
                                    className="cursor-pointer bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 group"
                                >
                                    <div className="p-6">
                                        {/* Thread Header */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full">
                                                    <FaUserCircle className="text-white text-xl" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900 dark:text-white">{fullName}</p>
                                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                                        <FaCalendarAlt className="text-xs" />
                                                        <span>{new Date(forum.created_at).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}</span>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        {/* Thread Content */}
                                        <div className="mb-4">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {forum.frm_title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                                                {forum.frm_description}
                                            </p>
                                        </div>

                                        {/* Thread Footer */}
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">

                                            <button className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium group/last">
                                                <span>Join Discussion</span>
                                                <FaPaperPlane className="group-hover/last:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center py-20">
                            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl max-w-md mx-auto">
                                <FaComments className="text-4xl text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No forums yet</h3>
                                <p className="text-gray-500 dark:text-gray-400 mb-4">Be the first to start a discussion!</p>
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mx-auto"
                                >
                                    <FaPlus />
                                    Create First Thread
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Forum Creation Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-2xl w-full max-w-md border border-gray-300 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                    <FaComments className="text-blue-600 dark:text-blue-400" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                    Create New Thread
                                </h2>
                            </div>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                            >
                                <FaTimes className="text-gray-500 dark:text-gray-400" />
                            </button>
                        </div>

                        <form onSubmit={handleCreatePost} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Forum Title
                                </label>
                                <input
                                    type="text"
                                    placeholder="What's your discussion about?"
                                    value={forumTitle}
                                    onChange={(e) => setForumTitle(e.target.value)}
                                    required
                                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Forum Description
                                </label>
                                <textarea
                                    placeholder="Describe your topic in detail..."
                                    value={forumDescription}
                                    onChange={(e) => setForumDescription(e.target.value)}
                                    required
                                    rows={4}
                                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                                ></textarea>
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                                >
                                    <FaPaperPlane />
                                    Create Thread
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Forums;