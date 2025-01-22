import React, { useState } from 'react';
import { FaBuilding, FaBell, FaClipboardList, FaBox, FaChartLine, FaCog, FaSignOutAlt } from 'react-icons/fa';

import Sidebar from '../components/Sidebar';
import BusinessProducts from './BusinessProducts'; // Import BusinessProducts
import BusinessOrder from "./BusinessOrder";

const BusinessDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview'); // Track active section

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const menuItems = [
    { name: 'Business Overview', link: 'overview', icon: FaBuilding },
    { name: 'Notifications', link: 'notifications', icon: FaBell },  // FaBell for notifications
    { name: 'Orders', link: 'orders', icon: FaClipboardList },       // FaClipboardList for orders
    { name: 'Products', link: 'products', icon: FaBox },              // FaBox for products
    { name: 'Sales', link: 'sales', icon: FaChartLine },              // FaChartLine for sales
    { name: 'Settings', link: 'settings', icon: FaCog },              // FaCog for settings
    { name: 'Logout', link: 'logout', icon: FaSignOutAlt },           // FaSignOutAlt for logout
  ];
  

  const renderContent = () => {
    switch (activeSection) {
      case 'products':
        return <BusinessProducts />; // Show Products section
      case 'overview':
        return <div>Buisness overview</div>;
      case 'notifications':
        return <div>Notifications Content</div>;
      case 'orders':
        return <BusinessOrder/>;
      case 'sales':
        return <div>Sales Content</div>;
      case 'settings':
        return <div>Settings Content</div>;
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      <Sidebar
        menuItems={menuItems}
        onMenuClick={(section) => setActiveSection(section)} // Update active section on click
        DashboardName={"Buisness Dash"}
      />
      <div className="flex-1 p-4">
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
          <h1 className="text-white text-xl">Business Dashboard</h1>
          <button onClick={handleLogout} className="text-white bg-yellow-500 px-4 py-2 rounded hover:bg-red-600">
            Log Out
          </button>
        </nav>
        <div className="mt-6">
          {renderContent()} {/* Dynamically render content based on active section */}
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;
