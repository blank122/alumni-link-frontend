/* eslint-disable no-unused-vars */
import React from 'react';

const Sidebar = () => {
    return (
        <aside className="w-64 bg-gray-200 p-6 fixed h-full">
            <ul className="space-y-4">
                <li className="hover:bg-gray-300 p-2 rounded">Dashboard</li>
                <li className="hover:bg-gray-300 p-2 rounded">Users</li>
                <li className="hover:bg-gray-300 p-2 rounded">Settings</li>
            </ul>
        </aside>
    );
};

export default Sidebar;
