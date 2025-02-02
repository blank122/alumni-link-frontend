import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logout } from '../../services/authService';

const AlumniDashboardCard = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post("http://127.0.0.1:8000/api/logout", {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });

            logout(); // Clear the token from localStorage
            alert('You have logged out!');
            navigate("/"); // Use React Router's navigate to redirect to the landing page
        } catch (error) {
            console.error('Logout error:', error);
            alert('Logout failed. Please try again.');
        }
    };

    return (
        <div className="ml-64 p-6 bg-white rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-xl font-semibold">Hello Alumni</h2>
            <button
                onClick={handleLogout}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
                Logout
            </button>
        </div>
    );
};


export default AlumniDashboardCard;
