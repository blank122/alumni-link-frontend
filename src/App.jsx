import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import UpcomingEvents from "./components/UpcomingEvents";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login"; // Import Login Page
import AdminDashboard from "./pages/AdminDashboard"; // Import Admin Dashboard

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
          <Route path="/admin" element={<AdminDashboard />} /> {/* Admin Dashboard route */}

        </Routes>
      </Router>
    </div>
  );
};

export default App;
