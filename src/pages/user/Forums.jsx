import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";


const Forums = () => {

    const { user, token } = useAuth();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/forums", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });

                if (response.data && response.data.data) {
                    setData(response.data.data);
                    console.log("Fetched data:", response.data.data);
                } else {
                    console.error("Unexpected API response structure:", response.data);
                    setData([]); // Fallback to empty array
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setData([]); // Prevent undefined issue
            } finally {
                setLoading(false);
            }
        };


        if (token) {
            fetchData();
        }
    }, [token]);

    // const handleCreateFeedback = async (e) => {
    //     e.preventDefault();
    //     setPostLoading(true);

    //     const formData = new FormData();
    //     formData.append("frm_title", forumTitle);
    //     formData.append("frm_description", forumDescription);
    //     formData.append("account_id", user.id);

    //     try {
    //         const response = await axios.post("http://127.0.0.1:8000/api/forums", formData, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 "Content-Type": "multipart/form-data",
    //             },
    //         });

    //         if (response.status === 201) {
    //             alert("Forum created successfully!");
    //             setShowModal(false);
    //             setForumTitle("");
    //             setForumDescription("");

    //         }
    //         setPostLoading(false);

    //     } catch (error) {
    //         console.error("Error creating Forum:", error);
    //     }
    // };



    return (
        <div className={`flex flex-col h-screen p-6 `}>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">📝 Forums</h1>
                <button
                    // onClick={() => setShowModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
                >
                    + Create Forums
                </button>
            </div>
            {loading ? (
                <p>Loading Forums...</p>
            ) : (
                <div className="min-w-6xl max-w-full mx-auto p-4 space-y-6">
                    {data && data.length > 0 ? (
                        data.map((forum) => {
                            const firstName = forum.account?.alumni?.alm_first_name || "Unknown";
                            const lastName = forum.account?.alumni?.alm_last_name || "";
                            const initials =
                                (firstName.charAt(0) || "").toUpperCase() + (lastName.charAt(0) || "").toUpperCase();
                            const fullName = `${firstName} ${lastName}`.trim(); // Ensure proper spacing

                            return (
                                <div
                                    key={forum.id}
                                    className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-4 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                                >
                                    {/* Header: Profile Picture & Name */}
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white font-bold rounded-full text-lg">
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
                                    <div className="mt-3">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{forum.frm_title}</h3>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{forum.frm_description}</p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center justify-between mt-4 text-gray-500 dark:text-gray-400 text-sm">
                                        {/* <button className="flex items-center space-x-1 hover:text-blue-500">
                                            <i className="fas fa-heart"></i>
                                            <span>Like</span>
                                        </button> */}
                                        <button className="flex items-center space-x-1 hover:text-blue-500">
                                            <i className="fas fa-comment"></i>
                                            <span>Create Discussion</span>
                                        </button>
                                        {/* <button className="flex items-center space-x-1 hover:text-blue-500">
                                            <i className="fas fa-share"></i>
                                            <span>Share</span>
                                        </button> */}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-gray-500 text-center col-span-full">No forums available.</p>
                    )}
                </div>
            )}

        </div>



    );
};

export default Forums;
