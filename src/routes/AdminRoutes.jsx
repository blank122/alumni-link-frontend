import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Make sure this is correctly imported

const AdminRoute = () => {
    const { user } = useAuth();

    // ✅ Check if user exists and is an admin (account_type === 1)
    return user && user.account_type === 1 ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;
