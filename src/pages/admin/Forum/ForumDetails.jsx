import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

const ForumDetails = () => {
    const { id } = useParams();
    const [forum, setForum] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchForumDetails = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/forums/${id}`);
                setForum(response.data.data);
            } catch (error) {
                console.error("Error fetching forum:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchForumDetails();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!forum) return <p>Forum not found.</p>;

    return (
        <div className="container mx-auto p-4">
            {/* Breadcrumbs */}
            <nav className="text-sm text-gray-500 mb-4">
                <Link to="/user/forums" className="hover:underline text-blue-500">Forums</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-700">{forum.frm_title}</span>
            </nav>

            {/* Forum Details */}
            <h1 className="text-2xl font-bold">{forum.frm_title}</h1>
            <p>{forum.frm_description}</p>

            {/* Threads */}
            <h2 className="text-xl font-semibold mt-4">Discussion</h2>
            {forum.threads.length > 0 ? (
                forum.threads.map((thread) => (
                    <div key={thread.id} className="border p-2 my-2">
                        <h3 className="font-bold">{thread.title}</h3>
                        <p>{thread.text}</p>
                    </div>
                ))
            ) : (
                <p>No threads available.</p>
            )}
        </div>
    );
};

export default ForumDetails;
