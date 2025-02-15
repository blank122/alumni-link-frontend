/* eslint-disable react/prop-types */


import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-40 w-64 h-screen bg-gray-50 dark:bg-gray-800 transform transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } sm:translate-x-0`}
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <NavLink
                                to="/admin/dashboard"
                                className={({ isActive }) =>
                                    `flex items-center p-2 rounded-lg dark:text-white ${isActive ? "bg-gray-200 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-700"
                                    }`
                                }
                            >
                                🏠 Dashboard
                            </NavLink>
                        </li>
                        {/* <li>
                            <button type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                                    <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                                </svg>
                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">E-commerce</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <ul id="dropdown-example" className="hidden py-2 space-y-2">
                                <li>
                                    <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Products</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Billing</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Invoice</a>
                                </li>
                            </ul>
                        </li> */}
                        {/* <li>
                            <NavLink
                                to="/admin/dashboard"
                                className={({ isActive }) =>
                                    `flex items-center p-2 rounded-lg dark:text-white ${isActive ? "bg-gray-200 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-700"
                                    }`
                                }
                            >
                                🏠 Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/admin/dashboard"
                                className={({ isActive }) =>
                                    `flex items-center p-2 rounded-lg dark:text-white ${isActive ? "bg-gray-200 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-700"
                                    }`
                                }
                            >
                                🏠 Dashboard
                            </NavLink>
                        </li> */}
                        <li>
                            <NavLink
                                to="/admin/settings"
                                className={({ isActive }) =>
                                    `flex items-center p-2 rounded-lg dark:text-white ${isActive ? "bg-gray-200 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-700"
                                    }`
                                }
                            >
                                🏠 Settings
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/admin/profile"
                                className={({ isActive }) =>
                                    `flex items-center p-2 rounded-lg dark:text-white ${isActive ? "bg-gray-200 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-700"
                                    }`
                                }
                            >
                                🏠 Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/admin/products"
                                className={({ isActive }) =>
                                    `flex items-center p-2 rounded-lg dark:text-white ${isActive ? "bg-gray-200 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-700"
                                    }`
                                }
                            >
                                📦  Products
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/admin/orders"
                                className={({ isActive }) =>
                                    `flex items-center p-2 rounded-lg dark:text-white ${isActive ? "bg-gray-200 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-700"
                                    }`
                                }
                            >
                                🛒 Orders
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col w-full sm:ml-64">
                {/* Navbar */}
                <header className="bg-white shadow-md p-4 flex items-center justify-between">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="sm:hidden p-2 text-gray-500 rounded-lg hover:bg-gray-100"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                clipRule="evenodd"
                                fillRule="evenodd"
                                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                            ></path>
                        </svg>
                    </button>
                    <span className="text-lg font-semibold">Admin Panel</span>
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-700">User</span>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 p-6 bg-gray-100 overflow-auto">{children}
                    <Outlet /> {/* Renders the selected page */}
                </main>
            </div>

            {/* Overlay */}
            {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 sm:hidden" onClick={() => setIsOpen(false)}></div>}
        </div>
    );
};

export default AdminLayout;
