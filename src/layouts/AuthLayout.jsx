import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="min-h-screen w-full bg-gray-100">
            <Outlet />
        </div>

    );
};

export default AuthLayout;
