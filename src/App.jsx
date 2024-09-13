import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Attendance from "./components/Attendance";
import Manageusers from "./components/Manageusers";
import LoginPage from "./components/Loginpage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check localStorage for authentication state on initial load
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (email, password) => {
    if (email === "admin@gmail.com" && password === "admin1234567890") {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true"); // Save authentication state
    } else {
      alert("Invalid credentials!");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated"); // Clear authentication state
  };

  return (
    <Router>
      <div className="min-h-screen flex">
        {isAuthenticated ? (
          <>
            <Sidebar onLogout={handleLogout}>
              <div className="ml-64 flex-grow">
                <Routes>
                  <Route path="/" element={<Navigate to="/attendance" />} />
                  <Route path="/attendance" element={<Attendance />} />
                  <Route path="/users" element={<Manageusers />} />
                </Routes>
              </div>
            </Sidebar>
          </>
        ) : (
          <LoginPage onLogin={handleLogin} />
        )}
      </div>
    </Router>
  );
};

export default App;
