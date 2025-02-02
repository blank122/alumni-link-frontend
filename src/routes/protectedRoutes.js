/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import Accounts from "../models/Account"; // Import your model

const ProtectedRoute = ({ children, allowedRoles }) => {
    // Retrieve user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    // Convert stored JSON to an Accounts object
    const user = storedUser ? Accounts.fromJSON(storedUser) : null;

    // If no user is found or role is not allowed, redirect to login
    if (!user || !allowedRoles.includes(user.accountType)) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
