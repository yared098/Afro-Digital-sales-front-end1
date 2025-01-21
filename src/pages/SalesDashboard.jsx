import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartLine, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Import icons
import Sidebar from '../components/Sidebar';

const SalesDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const menuItems = [
    { name: 'Sales Overview', link: '/sales-overview', icon: FaChartLine },
    { name: 'Profile', link: '/profile', icon: FaUser },
    { name: 'Settings', link: '/settings', icon: FaCog },
    { name: 'Logout', link: '/logout', icon: FaSignOutAlt },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar menuItems={menuItems} />
      <div className="flex-1 p-4">
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
          <h1 className="text-white text-xl">Sales Dashboard</h1>
          <button onClick={handleLogout} className="text-white bg-yellow-500 px-4 py-2 rounded hover:bg-red-600">Log Out</button>
        </nav>
        {/* Other content for the sales dashboard */}
      </div>
    </div>
  );
};

export default SalesDashboard;
