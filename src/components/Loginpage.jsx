import React, { useState } from "react";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center justify-center">
      <div className="flex flex-col items-center lg:items-start bg-white lg:p-16 top-0 left-0 h-screen bg-[url('./offi.webp')] bg-cover">
      </div>

      <div className="flex flex-col w-full items-center justify-center bg-white p-8 lg:p-16 shadow ml-32 ">
        <img src="digitalhorizon.png" className="h-40" />

        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>

          <button className="w-full py-2 px-4 bg-indigo-700 text-white rounded-md hover:bg-indigo-800 transition duration-300">
            Log in
          </button>
        </form>

      </div>
    </div>
  );
};

export default LoginPage;
