import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Attendance from "./components/Attendance";
import Manageusers from "./components/Manageusers";
import LoginPage from "./components/Loginpage";
import LeaveRequest from "./components/LeaveRequest";
import axios from "axios";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const payload = {
        email,
        password
      };

      const response = await axios.post('http://localhost:8000/admin/login', payload);

      if (response.data.success) {
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
      } else {
        alert("Invalid credentials!");
      }
    } catch (error) {
      console.error("Error during login", error);
      alert("Login failed. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
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
                  <Route path="/leave-requests" element={<LeaveRequest />} />
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
