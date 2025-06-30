import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

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

                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/forums/${id}`
                );
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
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/forums/${id}/threads`
                , formData, {
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
            }
        } catch (error) {
            console.error("Error creating discussion:", error);
        }
    };

    if (loading) return <p className="text-center text-gray-600">Loading...</p>;
    if (!forum) return <p className="text-center text-red-500">Forum not found.</p>;

    return (
        <div className="container mx-auto p-6">
            {/* Breadcrumbs */}
            <nav className="text-sm text-gray-500 mb-6">
                <Link to="/user/forums" className="hover:underline text-blue-500">Forums</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-700">{forum.frm_title}</span>
            </nav>

            {/* Forum Details */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h1 className="text-3xl font-bold mb-2">{forum.frm_title}</h1>
                <p className="text-gray-600">{forum.frm_description}</p>
            </div>

            {/* Discussion Section */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Discussions</h2>
                <button onClick={() => setOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Start Discussion</button>
            </div>

            {forum.threads.length > 0 ? (
                forum.threads.map((thread) => (
                    <div key={thread.id} className="border p-4 rounded-lg my-2 shadow-sm bg-white">
                        <h3 className="font-bold text-lg">{thread.title}</h3>
                        <p className="text-gray-700 mt-1">{thread.text}</p>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No discussions available.</p>
            )}

            {/* Modal for Creating Discussion */}
            {open && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Start a New Discussion</h2>
                        <input
                            type="text"
                            placeholder="Discussion Title"
                            value={discussionTitle}
                            onChange={(e) => setDiscussionTitle(e.target.value)}
                            className="w-full border p-2 rounded-lg mb-2"
                        />
                        <textarea
                            placeholder="Write your discussion..."
                            value={discussionText}
                            onChange={(e) => setDiscussionText(e.target.value)}
                            className="w-full border p-2 rounded-lg mb-4"
                        />
                        <div className="flex justify-end space-x-2">
                            <button onClick={() => setOpen(false)} className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400">Cancel</button>
                            <button onClick={handleCreatePost} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Post Discussion</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForumDetails;
