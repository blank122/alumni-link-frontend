import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import axios from "axios";

// Import icons
import {
    FaArrowLeft,
    FaComments,
    FaPlus,
    FaUserCircle,
    FaCalendarAlt,
    FaComment,
    FaEye,
    FaPaperPlane,
    FaTimes,
    FaEdit,
    FaHeart,
    FaShare,
    FaEllipsisH
} from "react-icons/fa";

const ForumDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
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
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/forums/${id}/threads`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 201) {
                alert("Discussion created successfully!");
                setOpen(false);
                setDiscussionTitle("");
                setDiscussionText("");
                // Refresh forum data to show new thread
                const updatedResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/forums/${id}`);
                setForum(updatedResponse.data.data);
            }
        } catch (error) {
            console.error("Error creating discussion:", error);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getInitials = (firstName, lastName) => {
        return ((firstName?.[0] || '') + (lastName?.[0] || '')).toUpperCase();
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );

    if (!forum) return (
        <div className="text-center py-20">
            <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-2xl max-w-md mx-auto">
                <FaComments className="text-4xl text-red-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-red-700 dark:text-red-300 mb-2">Forum not found</h3>
                <p className="text-red-600 dark:text-red-400 mb-4">The forum you're looking for doesn't exist.</p>
                <button
                    onClick={() => navigate('/admin/forums')}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mx-auto"
                >
                    <FaArrowLeft />
                    Back to Forums
                </button>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto py-8 px-4 max-w-8xl">
            {/* Header with Breadcrumbs */}
            <div className="flex items-center gap-3 mb-8">
                <button
                    onClick={() => navigate('/user/forums')}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                    <FaArrowLeft />
                </button>
                <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
                <nav className="flex items-center gap-2 text-sm">
                    <Link to="/user/forums" className="text-blue-600 dark:text-blue-400 hover:underline">Forums</Link>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-700 dark:text-gray-300 truncate max-w-xs">{forum.frm_title}</span>
                </nav>
            </div>

            {/* Forum Header */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 mb-8">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
                            <FaComments className="text-2xl text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{forum.frm_title}</h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">{forum.frm_description}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <FaCalendarAlt className="text-xs" />
                        <span>Created {formatDate(forum.created_at)}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                        {/* <div className="flex items-center gap-2">
                            <FaComment />
                            <span>{forum.threads?.length || 0} discussions</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaEye />
                            <span>{Math.floor(Math.random() * 1000)} views</span>
                        </div> */}
                    </div>
                    <button
                        onClick={() => setOpen(true)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        <FaPlus />
                        Start Discussion
                    </button>
                </div>
            </div>

            {/* Discussions Section */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <FaComments className="text-blue-600 dark:text-blue-400" />
                        Discussions ({forum.threads?.length || 0})
                    </h2>
                </div>

                {forum.threads?.length > 0 ? (
                    <div className="space-y-4">
                        {forum.threads.map((thread) => {
                            const firstName = thread.account?.alumni?.alm_first_name || "Unknown";
                            const lastName = thread.account?.alumni?.alm_last_name || "";
                            const fullName = `${firstName} ${lastName}`.trim();
                            const commentCount = Math.floor(Math.random() * 50); // Mock data

                            return (
                                <div key={thread.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 group">
                                    <div className="p-6">
                                        {/* Thread Header */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold rounded-full text-sm">
                                                    {getInitials(firstName, lastName)}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900 dark:text-white">{fullName}</p>
                                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                                        <FaCalendarAlt className="text-xs" />
                                                        <span>{formatDate(thread.created_at)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg transition-colors">
                                                <FaEllipsisH />
                                            </button> */}
                                        </div>

                                        {/* Thread Content */}
                                        <div className="mb-4">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {thread.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                                {thread.text}
                                            </p>
                                        </div>

                                        {/* Thread Actions */}
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                                {/* <button className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                    <FaHeart />
                                                    <span>Like</span>
                                                </button>
                                                <button className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                    <FaComment />
                                                    <span>{commentCount} comments</span>
                                                </button>
                                                <button className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                    <FaShare />
                                                    <span>Share</span>
                                                </button> */}
                                            </div>
                                            {/* <button className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium">
                                                <span>Reply</span>
                                                <FaPaperPlane className="text-xs" />
                                            </button> */}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                        <FaComments className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No discussions yet</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">Be the first to start a discussion in this forum!</p>
                        <button
                            onClick={() => setOpen(true)}
                            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors mx-auto"
                        >
                            <FaPlus />
                            Start First Discussion
                        </button>
                    </div>
                )}
            </div>

            {/* Create Discussion Modal */}
            {open && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-2xl w-full max-w-md border border-gray-300 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                    <FaEdit className="text-blue-600 dark:text-blue-400" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                    Start Discussion
                                </h2>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                            >
                                <FaTimes className="text-gray-500 dark:text-gray-400" />
                            </button>
                        </div>

                        <form onSubmit={handleCreatePost} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Discussion Title
                                </label>
                                <input
                                    type="text"
                                    placeholder="What do you want to discuss?"
                                    value={discussionTitle}
                                    onChange={(e) => setDiscussionTitle(e.target.value)}
                                    required
                                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Your Message
                                </label>
                                <textarea
                                    placeholder="Share your thoughts, questions, or ideas..."
                                    value={discussionText}
                                    onChange={(e) => setDiscussionText(e.target.value)}
                                    required
                                    rows={5}
                                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                                >
                                    <FaPaperPlane />
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