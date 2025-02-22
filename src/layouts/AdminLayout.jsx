/* eslint-disable react/prop-types */

import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

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
                        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                        <div>
                            <h2 className="text-lg font-semibold">Admin Name</h2>
                            <p className="text-sm text-gray-500">Administrator</p>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <ul className="mt-6 space-y-2">
                        {[
                            { path: "/admin/dashboard", label: "Dashboard", icon: "🏠" },
                            { path: "/admin/jobs", label: "Jobs", icon: "📋" },
                            { path: "/admin/announcement", label: "Announcements", icon: "📢" },
                            { path: "/admin/events", label: "Events", icon: "📅" },
                            { path: "/admin/forums", label: "Forums", icon: "💬" },
                            { path: "/admin/course-list", label: "Course List", icon: "📚" },
                            { path: "/admin/alumni-list", label: "Alumni List", icon: "🎓" },
                            { path: "/admin/manage-map", label: "Manage Map", icon: "🗺️" },
                            { path: "/admin/manage-feedback", label: "Feedback", icon: "📝" },
                            { path: "/admin/statistical-reports", label: "Reports", icon: "📊" },
                            { path: "/logout", label: "Logout", icon: "🚪" }
                        ].map(({ path, label, icon }) => (
                            <li key={path}>
                                <NavLink
                                    to={path}
                                    className={({ isActive }) =>
                                        `flex items-center space-x-3 p-3 rounded-lg text-gray-700 font-medium ${isActive ? "bg-green-100 text-green-700" : "hover:bg-gray-200"
                                        }`
                                    }
                                >
                                    <span>{icon}</span>
                                    <span>{label}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
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
                        <span className="text-lg font-semibold">Alumnilink | Admin Panel</span>
                    </div>
                    {/* Yellow divider line */}
                </header>
                <div className="h-1 bg-yellow-500 "></div>


                {/* Page content */}
                <main className="flex-1 p-6 bg-gray-100 overflow-auto">{children}
                    <Outlet />
                </main>
            </div>

            {/* Overlay */}
            {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 sm:hidden" onClick={() => setIsOpen(false)}></div>}
        </div>
    );
};

export default AdminLayout;
