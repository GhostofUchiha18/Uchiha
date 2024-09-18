import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import Cookies from "js-cookie";

const Sidebar = ({ links }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("authToken");
    navigate("/login");
  };

  return (
    <div className="h-screen bg-gray-800 text-white">
      <nav className="space-y-4 p-4">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className="block text-lg"
            activeClassName="bg-gray-700"
          >
            {link.icon}
            {link.name}
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className="flex items-center text-lg text-red-500 mt-4"
        >
          <LogOut className="mr-2" />
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
