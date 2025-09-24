/* eslint-disable react/prop-types */

import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
    Home,
    Briefcase,
    Megaphone,
    Calendar,
    MessageSquare,
    Map,
    User,
    MessageCircle,
    HelpCircle,
    LogOut,
} from "lucide-react";
const userNavItems = [
    { path: "/user/dashboard", label: "Dashboard", icon: <Home size={18} /> },
    { path: "/user/jobs", label: "Jobs", icon: <Briefcase size={18} /> },
    { path: "/user/announcement", label: "Announcements", icon: <Megaphone size={18} /> },
    { path: "/user/events", label: "Events", icon: <Calendar size={18} /> },
    { path: "/user/forums", label: "Forums", icon: <MessageSquare size={18} /> },
    { path: "/user/maps", label: "Map", icon: <Map size={18} /> },
    { path: "/user/profile", label: "Profile", icon: <User size={18} /> },
    { path: "/user/survey", label: "Feedback", icon: <MessageCircle size={18} /> },
    { path: "/user/help", label: "Help", icon: <HelpCircle size={18} /> },
];
const UserLayout = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth(); // Retrieve user and logout function
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault(); // Prevent default link navigation
        logout(); // Clear user authentication
        navigate("/login"); // Redirect to login page
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-40 w-72 h-screen bg-white shadow-lg transform transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } sm:translate-x-0`}
            >
                <div className="h-full flex flex-col px-4 py-6">
                    {/* User Profile Section */}
                    <div className="flex items-center space-x-4 p-4 border-b">
                        <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-1xl font-bold">
                            {user.alumni.alm_first_name[0]}{user.alumni.alm_last_name[0]}
                        </div>
                        {user ? (
                            <div>
                                <p>{user.alumni.alm_first_name} {user.alumni.alm_last_name}</p>
                            </div>
                        ) : (
                            <p>Loading user data...</p>
                        )}
                    </div>


                    <div className="flex-1 overflow-y-auto px-4 py-3">
                        <ul className="space-y-1">
                            {userNavItems.map(({ path, label, icon }) => (
                                <li key={path}>
                                    <NavLink
                                        to={path}
                                        className={({ isActive }) =>
                                            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 
                 font-medium text-sm
                 ${isActive
                                                ? "bg-blue-100 text-blue-700 shadow-sm border-l-4 border-blue-600"
                                                : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                                            }`
                                        }
                                    >
                                        <span className="flex-shrink-0">{icon}</span>
                                        <span className="tracking-wide">{label}</span>
                                    </NavLink>
                                </li>
                            ))}

                            {/* Logout */}
                            <li className="pt-4">
                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 font-medium text-sm hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                                >
                                    <LogOut size={18} />
                                    <span>Logout</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col w-full sm:ml-72">
                {/* Navbar */}
                <header className="bg-green-600 shadow-md p-4 flex flex-col text-white">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="sm:hidden p-2 rounded-lg focus:outline-none"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    clipRule="evenodd"
                                    fillRule="evenodd"
                                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                ></path>
                            </svg>
                        </button>
                        <span className="text-lg font-semibold">Alumnilink | User Panel</span>
                    </div>
                </header>
                <div className="h-1 bg-yellow-500 "></div>

                {/* Page content */}
                <main className="flex-1  bg-gray-100 overflow-auto">{children}
                    <Outlet />
                </main>
            </div>

            {/* Overlay */}
            {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 sm:hidden" onClick={() => setIsOpen(false)}></div>}
        </div>
    );
};

export default UserLayout;
