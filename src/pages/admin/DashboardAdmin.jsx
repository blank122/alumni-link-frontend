import { useAuth } from "../../contexts/AuthContext";

const DashboardAdmin = () => {
    const { user, token } = useAuth(); // Retrieve user and token

    return (
        <div className="flex flex-col h-screen p-6">
            <h1 className="text-2xl font-bold">Welcome to Admin Panel</h1>

            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <h2 className="text-xl font-semibold">User Info</h2>
                {user ? (
                    <div>
                        <p><strong>first name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                    </div>
                ) : (
                    <p>Loading user data...</p>
                )}
            </div>

            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <h2 className="text-xl font-semibold">Auth Token</h2>
                {token ? (
                    <p className="break-all">{token}</p> // Prevents long text overflow
                ) : (
                    <p>No token found</p>
                )}
            </div>
        </div>
    );
};

export default DashboardAdmin;
