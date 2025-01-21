import React, { useState } from 'react';
import { FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Import icons

const Sidebar = ({ menuItems }) => {  // Accept dynamic menu items as props
  const [isCollapsed, setIsCollapsed] = useState(false);  // State to toggle collapse
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className={`h-screen bg-gray-800 text-white transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex justify-between items-center p-4">
        <h2 className={`text-xl font-semibold transition-all ${isCollapsed ? 'hidden' : ''}`}>Dashboard</h2>
        <button onClick={toggleSidebar} className="text-white p-2">
          {isCollapsed ? '☰' : '✖'}
        </button>
      </div>

      <nav className="mt-6">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <a href={item.link} className={`flex items-center p-4 hover:bg-gray-700 ${isCollapsed ? 'justify-center' : ''}`}>
                <item.icon size={24} className={`mr-4 ${isCollapsed ? 'mx-auto' : ''}`} />
                <span className={`${isCollapsed ? 'hidden' : ''}`}>{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
