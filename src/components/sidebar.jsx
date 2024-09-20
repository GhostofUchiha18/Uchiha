import React, { useState } from "react";
import { NotepadText, UserCog, LogOut, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const onLogout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    console.log("User logged out successfully.");
    setActiveIndex(-1); 
  };

  const menuItems = [
    { name: "Attendance", path: "/attendance", icon: <NotepadText /> },
    { name: "Users", path: "/users", icon: <UserCog /> },
    { name: "Logout", path: "/", icon: <LogOut /> },
  ];

  const handleNavigation = (item, index) => {
    if (item.name === "Logout") {
      onLogout();
      navigate("/"); 
    } else {
      setActiveIndex(index); 
      navigate(item.path);
    }
  };

  return (
    <div className="flex">
      <div className="flex flex-col fixed top-0 left-0 h-screen w-64 bg-[#59C9A5] text-[#CAD4D0] font-semibold text-xl">
        <img src="/digitalhorizon.png" alt="Logo" />
        <nav>
          <ul className="space-y-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleNavigation(item, index)}
                  className={`flex items-center w-full text-left p-2 border-none transition-colors duration-200 ${
                    activeIndex === index ? "text-black w-full rounded-s-sm" : "hover:text-black"
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
