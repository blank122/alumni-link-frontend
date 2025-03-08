import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/admin/DashboardAdmin";
import Jobs from "../pages/admin/Jobs";
import Announcement from "../pages/admin/Announcement";
import Events from "../pages/admin/Events";
import Forums from "../pages/admin/Forums";
import AlumniList from "../pages/admin/AlumniList";
import CourseList from "../pages/admin/CourseList";
import ManageMap from "../pages/admin/ManageMap";
import ManageFeedback from "../pages/admin/ManageFeedback";
import StatisticalReports from "../pages/admin/StatisticalReports";

import Login from "../pages/Login";
import Register from "../pages/Register1";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoutes";
import Home from "../pages/Home";

import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";
import UserDashboard from "../pages/admin/DashboardAdmin";
import UserJobs from "../pages/admin/Jobs";
import UserAnnouncement from "../pages/admin/Announcement";
import UserEvents from "../pages/admin/Events";
import UserForums from "../pages/admin/Forums";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>

            {/* Admin Route */}
            <Route element={<ProtectedRoute allowedTypes={[1]} />}>
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="jobs" element={<Jobs />} />
                    <Route path="announcement" element={<Announcement />} />
                    <Route path="events" element={<Events />} />
                    <Route path="forums" element={<Forums />} />
                    <Route path="course-list" element={<CourseList />} />
                    <Route path="alumni-list" element={<AlumniList />} />
                    <Route path="manage-map" element={<ManageMap />} />
                    <Route path="manage-feedback" element={<ManageFeedback />} />
                    <Route path="statistical-reports" element={<StatisticalReports />} />
                </Route>
            </Route>

            {/* User Route */}
            <Route element={<ProtectedRoute allowedTypes={[0]} />}>
                <Route path="/user" element={<UserLayout />}>
                    <Route path="dashboard" element={<UserDashboard />} />
                    <Route path="jobs" element={<UserJobs />} />
                    <Route path="announcement" element={<UserAnnouncement />} />
                    <Route path="events" element={<UserEvents />} />
                    <Route path="forums" element={<UserForums />} />
                    <Route path="cce-admins" element={<CourseList />} />
                    <Route path="maps" element={<ManageMap />} />
                    <Route path="profile" element={<ManageFeedback />} />
                    <Route path="help" element={<StatisticalReports />} />
                </Route>
            </Route>

        </Routes>
    );
};

export default AppRoutes;
