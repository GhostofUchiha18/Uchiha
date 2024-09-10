import React, { useState } from "react";
import { NotepadText, UserCog } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const menuItems = [
    { name: "Attendance", path: "/attendance", icon: <NotepadText /> },
    { name: "Users", path: "/users", icon: <UserCog /> },
  ];

  const handleNavigation = (path, index) => {
    navigate(path);
    setActiveIndex(index);
  };

  return (
    <div className="flex">
      <div className="flex flex-col fixed top-0 left-0 h-screen w-64 bg-blue-900 text-white p-5 font-medium">
        <img src="/LogoRed.png" alt="Logo" />
        <nav>
          <ul className="space-y-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleNavigation(item.path, index)}
                  className={`flex items-center text-left p-2 rounded-md transition-colors duration-200 ${
                    activeIndex === index ? "bg-white text-blue-900" : "hover:bg-white text-white hover:text-blue-900"
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
