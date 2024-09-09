import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Attendance from "./components/Attendance";
import Manageusers from "./components/Manageusers";
import LoginPage from "./components/Loginpage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (email, password) => {
    if (email === "test@example.com" && password === "password123") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <Router>
      <div className="min-h-screen flex">
        {isAuthenticated ? (
          <>
            <Sidebar>
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
