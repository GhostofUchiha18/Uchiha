import React, { useState } from "react";
import { NotepadText, UserCog, LogOut } from "lucide-react"; // Add LogOut icon
import { useNavigate } from "react-router-dom";

const Sidebar = ({ children, onLogout }) => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const menuItems = [
    { name: "Attendance", path: "/attendance", icon: <NotepadText /> },
    { name: "Users", path: "/users", icon: <UserCog /> },
    { name: "Logout", path: "/logout", icon: <LogOut /> }, // Add Logout option
  ];

  const handleNavigation = (item, index) => {
    if (item.name === "Logout") {
      onLogout(); // Call the logout handler when Logout is clicked
    } else {
      navigate(item.path);
      setActiveIndex(index);
    }
  };

  return (
    <div className="flex">
      <div className="flex flex-col fixed top-0 left-0 h-screen w-64 bg-blue-900 text-white font-medium border-white">
        <img src="/LogoRed.png" alt="Logo" />
        <nav>
          <ul className="space-y-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleNavigation(item, index)}
                  className={`flex items-center text-left p-2 transition-colors duration-200 ${
                    activeIndex === index ? "bg-white text-blue-900 w-full" : ""
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="">{children}</div>
    </div>
  );
};

export default Sidebar;
