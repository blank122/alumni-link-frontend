import { useAuth } from "../../contexts/AuthContext";

const DashboardUser = () => {
    const { token } = useAuth();

    // Stats Data


    return (
        <div className="flex flex-col h-screen p-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
    );
};

export default DashboardUser;
