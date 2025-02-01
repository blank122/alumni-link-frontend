import 'react';
import AdminLayout from './admin/AdminLayout'; // Import AdminLayout

const AdminDashboard = () => {
    return (
        <AdminLayout>
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold">Hello, Admin!</h2>
                <button className="mt-4 p-2 bg-red-600 text-white rounded">Logout</button>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
