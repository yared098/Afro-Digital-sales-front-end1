import React, { useState } from 'react';
import { FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Import icons

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // State to toggle collapse
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
          <li>
            <a href="/dashboard" className={`flex items-center p-4 hover:bg-gray-700 ${isCollapsed ? 'justify-center' : ''}`}>
              <FaHome size={24} className={`mr-4 ${isCollapsed ? 'mx-auto' : ''}`} />
              <span className={`${isCollapsed ? 'hidden' : ''}`}>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="/profile" className={`flex items-center p-4 hover:bg-gray-700 ${isCollapsed ? 'justify-center' : ''}`}>
              <FaUser size={24} className={`mr-4 ${isCollapsed ? 'mx-auto' : ''}`} />
              <span className={`${isCollapsed ? 'hidden' : ''}`}>Profile</span>
            </a>
          </li>
          <li>
            <a href="/settings" className={`flex items-center p-4 hover:bg-gray-700 ${isCollapsed ? 'justify-center' : ''}`}>
              <FaCog size={24} className={`mr-4 ${isCollapsed ? 'mx-auto' : ''}`} />
              <span className={`${isCollapsed ? 'hidden' : ''}`}>Settings</span>
            </a>
          </li>
          <li>
            <a href="/logout" className={`flex items-center p-4 hover:bg-gray-700 ${isCollapsed ? 'justify-center' : ''}`}>
              <FaSignOutAlt size={24} className={`mr-4 ${isCollapsed ? 'mx-auto' : ''}`} />
              <span className={`${isCollapsed ? 'hidden' : ''}`}>Logout</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
