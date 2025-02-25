/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

// import AdminLayout from "../layouts/AdminLayout";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoutes";
import { NotFound, AccessDenied, ServerError } from "../pages/errors/ErrorPage";
import Home from "../pages/Home";

import AdminLayout from "../layouts/AdminLayout";

const AppRoutes = () => {

    const user = {
        isAuthenticated: true, // Change this based on auth logic
        role: "user", // Example: "admin", "user"
    };

    return (
        // <Router>
        <Routes>
            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            </Route>
            {/* User route */}
            {/* <Route element={<ProtectedRoute />}>
                <Route path="/user" element={<UserLayout />}>
                    <Route path="dashboard" element={<DashboardUser />} />
                    <Route path="products" element={<ProductsUser />} />
                    <Route path="orders" element={<OrdersUser />} />
                    <Route path="profile" element={<ProfileUser />} />
                    <Route path="settings" element={<SettingsUser />} />
                </Route>
            </Route> */}

            {/* Admin Route */}
            <Route element={<ProtectedRoute />}>
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

        </Routes>
        // </Router>
    );
};

export default AppRoutes;