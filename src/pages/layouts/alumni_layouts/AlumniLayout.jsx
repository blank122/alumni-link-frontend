/* eslint-disable react/prop-types */
import 'react';
import Sidebar from '../alumni_layouts/SidebarAlumni'; // Your Sidebar Component
import Header from '../alumni_layouts/HeaderAlumni'; // Your Header Component

const AlumniLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <div className="flex"> {/* Add mt-16 or any value to create space */}
                <Sidebar />
                <div className="ml-64 p-6 w-full">
                    {children}  {/* Render the specific content for each admin page */}
                </div>
            </div>
        </div>
    );
};

export default AlumniLayout;
