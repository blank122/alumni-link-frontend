import 'react';
import AlumniLayout from './layouts/alumni_layouts/AlumniLayout'; // Import AdminLayout
import AlumniDashboardCard from './alumni/AlumniDashboardCard';

const AlumniDashboard = () => {
    return (
        <AlumniLayout>
            <AlumniDashboardCard />
        </AlumniLayout>
    );
};

export default AlumniDashboard;
