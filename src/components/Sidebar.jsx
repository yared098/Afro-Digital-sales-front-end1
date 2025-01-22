import React, { useState } from 'react';
import { FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Import icons

const Sidebar = ({ menuItems, onMenuClick ,DashboardName}) => {  // Accept dynamic menu items and onMenuClick as props
  const [isCollapsed, setIsCollapsed] = useState(false);  // State to toggle collapse
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className={`h-screen bg-gray-800 text-white transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex justify-between items-center p-4">
        <h2 className={`text-xl font-semibold transition-all ${isCollapsed ? 'hidden' : ''}`}>{DashboardName}</h2>
        <button onClick={toggleSidebar} className="text-white p-2">
          {isCollapsed ? '☰' : '✖'}
        </button>
      </div>

      <nav className="mt-6">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => onMenuClick(item.link)} // Trigger the active section change
                className={`flex items-center p-4 hover:bg-gray-700 w-full text-left ${isCollapsed ? 'justify-center' : ''}`}
              >
                <item.icon size={24} className={`mr-4 ${isCollapsed ? 'mx-auto' : ''}`} />
                <span className={`${isCollapsed ? 'hidden' : ''}`}>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
