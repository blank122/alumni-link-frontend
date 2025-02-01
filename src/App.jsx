import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import UpcomingEvents from "./components/UpcomingEvents";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login"; // Import Login Page

const App = () => {
  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<>
            <Hero />
            <UpcomingEvents />
          </>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
