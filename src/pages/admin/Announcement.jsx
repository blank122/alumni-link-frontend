import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

const Announcements = () => {
    const { user, token } = useAuth();
    const [announcements, setAnnouncementsPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    // Form State
    const [annTitle, setAnnTitle] = useState("");
    const [annDetails, setAnnDetails] = useState("");
    const [annImage, setAnnImage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/announcements`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    });
                setAnnouncementsPosts(response.data.data);
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

    // Handle Form Submission
    const handleCreatePost = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("ann_title", annTitle);
        formData.append("ann_details", annDetails);
        formData.append("account_id", user.id);
        if (annImage) formData.append("ann_image", annImage);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/admin/announcements`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );


            if (response.status === 201) {
                window.location.reload(); // Reload the page after successful action
                alert("Announcements created successfully!");
                setShowModal(false);
                setAnnTitle("");
                setAnnDetails("");
                setAnnImage(null);
            }
        } catch (error) {
            console.error("Error creating job:", error);
        }
    };


    return (
        <div className={`flex flex-col h-screen p-6 ${showModal ? "backdrop-blur-md" : ""}`}>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Announcements Posts</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700"
                >
                    Create Announcement
                </button>
            </div>

            <div className="p-4 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Announcements</h2>
                {loading ? (
                    <p className="text-gray-500">Loading announcements posts data...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="px-6 py-3 text-left">Announcement Title</th>
                                    <th className="px-6 py-3 text-left">Announcement Details</th>
                                    <th className="px-6 py-3 text-left">Announcement Image</th>
                                    <th className="px-6 py-3 text-left">Date Posted</th>
                                </tr>
                            </thead>
                            <tbody>
                                {announcements.length > 0 ? (
                                    announcements.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200 transition`}
                                        >
                                            <td className="px-6 py-4 text-gray-700">{item.ann_title || "N/A"}</td>
                                            <td className="px-6 py-4 text-gray-700">{item.ann_details || "N/A"}</td>
                                            <td className="px-6 py-4">
                                                {item.ann_image ? (
                                                    <img
                                                        src={`${import.meta.env.VITE_API_BASE_URL}/storage/announcements/${item.ann_image}`
                                                        }
                                                        alt="Announcement Post"
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
                                            No Announcements data found
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
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-full max-w-lg p-6">
                        <h2 className="text-lg font-semibold mb-4">Create Announcement  </h2>
                        <form onSubmit={handleCreatePost} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Announcement Title</label>
                                <input
                                    type="text"
                                    value={annTitle}
                                    onChange={(e) => setAnnTitle(e.target.value)}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300 hover:border-green-500 focus:scale-[1.02]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Announcement Details</label>
                                <textarea
                                    value={annDetails}
                                    onChange={(e) => setAnnDetails(e.target.value)}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300 hover:border-green-500 focus:scale-[1.02]"
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                                <input
                                    type="file"
                                    onChange={(e) => setAnnImage(e.target.files[0])}
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
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
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
