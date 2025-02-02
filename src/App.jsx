import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import UpcomingEvents from "./components/UpcomingEvents";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login"; // Import Login Page
import AdminDashboard from "./pages/AdminDashboard"; // Import Admin Dashboard
import ProtectedRoute from "./routes/ProtectedRoute";
import AlumniDashboard from "./pages/AlumniDashboard"; // Import Admin Dashboard

const App = () => {
  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<>
            <Navbar isAdminPage={false} /> {/* Landing Page Navbar */}
            <Hero />
            <UpcomingEvents />
          </>} />
          <Route path="/login" element={<>
            <Navbar isAdminPage={false} /> {/* Landing Page Navbar */}
            <Login /></>
          } />
          {/* Protected Routes */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={[1]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/alumni-dashboard"
            element={
              <ProtectedRoute allowedRoles={[0]}>
                <AlumniDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
