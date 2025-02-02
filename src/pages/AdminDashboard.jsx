import 'react';
import AdminLayout from './layouts/admin_layouts/AdminLayout'; // Import AdminLayout
import DashboardCard from './admin/DashboardCard';

const AdminDashboard = () => {
    return (
        <AdminLayout>
            <DashboardCard />
        </AdminLayout>
    );
};

export default AdminDashboard;
