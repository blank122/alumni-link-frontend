import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
                <h1 className="text-4xl font-bold text-red-600 mb-4">🚫 Access Denied</h1>
                <p className="text-gray-700 text-lg mb-6">
                    You do not have permission to view this page.
                </p>
                <button
                    onClick={() => navigate(-1)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default Unauthorized;
