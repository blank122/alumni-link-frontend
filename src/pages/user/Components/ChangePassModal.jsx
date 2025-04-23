
import { useAuth } from "../../../contexts/AuthContext";

const ChangePassModal = ({ isOpen, onClose }) => {


    const handleSave = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/edit-address/30", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    alumni_id: user.alumni_id,
                    ...newAddress,
                }),
            });

            const result = await response.json();
            console.log("Server response:", result);
            //   onClose(); // close modal after success
        } catch (error) {
            console.error("Failed to send address:", error);
        }
    };



    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Change Password</h3>

                <form>
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => setChangePassword(false)}
                            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        {/* <button
                                    type="button"
                                    onClick={handleAddJob}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Add Job
                                </button> */}
                    </div>
                </form>
            </div>
        </div>
    );
}