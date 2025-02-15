/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// const ProtectedRoute = () => {
//     const { user } = useAuth();
//     return user ? <Outlet /> : <Navigate to="/login" replace />;
// };

const ProtectedRoute = ({ allowedRoles }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/no-access" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
