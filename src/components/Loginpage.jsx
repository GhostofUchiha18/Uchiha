import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const payload = { email, password }; 
      const response = await axios.post(
        "http://localhost:8000/admin/login",
        payload
      );
      console.log(response.data);
      if (response.data.access_token) {
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("accessToken", response.data.access_token);
        navigate("/attendance");
      } else {
        alert("Invalid credentials!");
      }
    } catch (error) {
      console.error("Error during login", error);
      alert("Login failed. Please try again.");
    }
  };


  return (
    <div className="min-h-screen grid lg:grid-cols-2 items-center justify-center">
      <div className="flex flex-col items-center lg:items-start bg-white lg:p-0 top-0 left-0 h-screen bg-[url('./helatt.jpg')] bg-cover"></div>

      <div className="flex flex-col w-full items-center justify-center bg-white p-8 lg:p-16 ">
        <img src="digitalhorizon.png" className="h-64" />

        <form
          className="w-full max-w-sm"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 mt-3 bg-indigo-700 text-white rounded-md hover:bg-indigo-800 transition duration-300"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
