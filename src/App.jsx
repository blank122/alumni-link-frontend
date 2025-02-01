import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import UpcomingEvents from "./components/UpcomingEvents";

const App = () => {
  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      <Navbar />
      <Hero />
      <UpcomingEvents />
    </div>
  );
};

export default App;
