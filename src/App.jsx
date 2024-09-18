import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/sidebar";
import Attendance from "./components/Attendance";
import Manageusers from "./components/Manageusers";
import LoginPage from "./components/Loginpage";
import LeaveRequest from "./components/LeaveRequest";
import axios from "axios";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/users" element={<Manageusers />} />
        <Route path="/leave-requests" element={<LeaveRequest />} />
      </Routes>
    </Router>
  );
};

export default App;
