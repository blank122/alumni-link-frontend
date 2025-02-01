import 'react';

const DashboardCard = () => {
    const handleLogout = () => {
        alert('You have logged out!');
    };

    return (
        <div className="ml-64 p-6 bg-white rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-xl font-semibold">Hello User</h2>
            <button
                onClick={handleLogout}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
                Logout
            </button>
        </div>
    );
};

export default DashboardCard;
