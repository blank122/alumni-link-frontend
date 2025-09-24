import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
                setData([response.data, ...data]); // Add new forum to top
            }
        } catch (error) {
            console.error("Error creating forum:", error);
        }
    };

    return (
        <div className="container mx-auto py-10 px-4">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                    📝 Forums
                </h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
                >
                    + Create Forum
                </button>
            </div>

            {/* Loading */}
            {loading ? (
                <p className="text-center text-gray-500 mt-10">Loading Forums...</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.length > 0 ? (
                        data.map((forum) => {
                            const firstName = forum.account?.alumni?.alm_first_name || "Unknown";
                            const lastName = forum.account?.alumni?.alm_last_name || "";
                            const initials = (firstName[0] || "").toUpperCase() + (lastName[0] || "").toUpperCase();
                            const fullName = `${firstName} ${lastName}`.trim();

                            return (
                                <div
                                    key={forum.id}
                                    onClick={() => navigate(`/admin/forums/${forum.id}`)}
                                    className="cursor-pointer bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-md p-5 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                                >
                                    {/* Header */}
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white font-bold rounded-full text-lg">
                                            {initials}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{fullName}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {new Date(forum.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="mt-4">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{forum.frm_title}</h3>
                                        <p className="text-gray-600 dark:text-gray-300 mt-1">{forum.frm_description}</p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center justify-end mt-4 gap-4 text-gray-500 dark:text-gray-400 text-sm">
                                        <button className="flex items-center gap-1 hover:text-blue-500 transition">
                                            <i className="fas fa-comment"></i> Discuss
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-gray-500 text-center col-span-full mt-10">No forums available.</p>
                    )}
                </div>
            )}

            {/* Forum Creation Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-2xl w-96 border border-gray-300 dark:border-gray-700">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
                            📝 Create Forum
                        </h2>
                        <form onSubmit={handleCreatePost} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Forum Title"
                                value={forumTitle}
                                onChange={(e) => setForumTitle(e.target.value)}
                                required
                                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300 hover:border-blue-500"
                            />
                            <textarea
                                placeholder="Forum Description"
                                value={forumDescription}
                                onChange={(e) => setForumDescription(e.target.value)}
                                required
                                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300 hover:border-blue-500"
                            ></textarea>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
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

export default Forums;
