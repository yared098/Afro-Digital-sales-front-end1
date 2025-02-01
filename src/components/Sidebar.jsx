import React, { useState } from 'react';
import { FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa'; // Toggle icons

const Sidebar = ({ menuItems, onMenuClick, DashboardName }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const handleMenuClick = (link, index) => {
    setActiveItem(index);
    onMenuClick(link);
  };

  return (
    <div
      className={`h-screen sticky top-0 bg-green-600/90 text-white shadow-lg rounded-2xl transition-all duration-300 
        ${isCollapsed ? 'w-20' : 'w-64'} flex flex-col`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-green-400">
        {!isCollapsed && <h2 className="text-xl font-semibold">{DashboardName}</h2>}
        <button onClick={toggleSidebar} className="p-2 text-white transition-all hover:text-green-300">
          {isCollapsed ? <FaBars size={20} /> : <FaTimes size={20} />}
        </button>
      </div>

      {/* Sidebar Menu */}
      <nav className="flex-1 mt-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index} className="relative">
              <button
                onClick={() => handleMenuClick(item.link, index)}
                className={`flex items-center gap-4 px-5 py-3 w-full text-left text-lg rounded-lg transition-all duration-300 
                  ${isCollapsed ? 'justify-center' : ''} 
                  ${activeItem === index ? 'bg-gradient-to-r from-green-500 to-green-400 shadow-md' : 'hover:bg-green-500/70'}`}
              >
                <item.icon size={22} />
                <span className={`${isCollapsed ? 'hidden' : 'block'}`}>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="px-5 pb-4 mt-auto">
        <button
          className="flex items-center w-full gap-4 px-4 py-3 text-lg transition-all bg-red-500 rounded-lg shadow-md hover:bg-red-600"
          onClick={() => onMenuClick('/logout')}
        >
          <FaSignOutAlt size={22} />
          <span className={`${isCollapsed ? 'hidden' : 'block'}`}>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
