import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartLine, FaBox, FaShoppingCart, FaBell, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

import Sidebar from '../components/Sidebar';
import SalesProduct from './SalesProduct';
import SalesOrder from "./SalesOrder"
import { useAuth } from "../context/AuthContext";


const SalesDashboard = () => {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState('products'); // Set default active section to 'products'
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const { user, logout } = useAuth();

  const [products, setProducts] = useState([
    { id: 1, name: 'Product A', price: 100 },
    { id: 2, name: 'Product B', price: 200 },
    { id: 3, name: 'Product C', price: 300 },
    { id: 4, name: 'Product D', price: 400 },
    { id: 5, name: 'Product E', price: 500 },
    { id: 6, name: 'Product F', price: 600 },
    { id: 7, name: 'Product G', price: 700 },
    { id: 8, name: 'Product H', price: 800 },
    { id: 9, name: 'Product I', price: 900 },
    { id: 10, name: 'Product J', price: 1000 },
  ]);

  const handleLogout = async () => {
      try {
        await signOut();
        localStorage.removeItem('user');
        navigate('/login');
      } catch (error) {
        console.error('Error signing out:', error);
      }
    };
  

  const menuItems = [
    { name: 'Sales Overview', link: 'sales-overview', icon: FaChartLine, section: 'overview' },
    { name: 'Products', link: 'products', icon: FaBox, section: 'products' }, // Changed to FaBox for product
    { name: 'Orders', link: 'orders', icon: FaShoppingCart, section: 'orders' }, // Changed to FaShoppingCart for orders
    { name: 'Notifications', link: 'notifications', icon: FaBell, section: 'notifications' }, // Changed to FaBell for notifications
    { name: 'Profile', link: 'profile', icon: FaUser, section: 'profile' },
    { name: 'Settings', link: 'settings', icon: FaCog, section: 'settings' },
    { name: 'Logout', link: 'logout', icon: FaSignOutAlt, section: 'logout' },
  ];

  const handleSectionChange = (section) => {
    setActiveSection(section); // Update active section when a sidebar item is clicked
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'products':
        return <SalesProduct products={products} />; // Show Products section
      case 'overview':
        return <div>Sales Overview Content</div>;
      case 'notifications':
        return <div>Notifications Content</div>;
      case 'orders':
        return <SalesOrder/>;
      case 'sales':
        return <div>Sales Content</div>;
      case 'settings':
        return <div>Settings Content</div>;
      case "logout":
          logout();
         return null;
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar menuItems={menuItems} onMenuClick={handleSectionChange} DashboardName={"Sales Dash"} />

      {/* Main Dashboard Area */}
      <div className="flex-1 p-4 overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded-lg w-1/3"
          />

          {/* Other Navbar Items (if any) */}
          <div>
            <button className="p-2 text-gray-700">Profile</button>
            <button className="p-2 text-gray-700" onClick={handleLogout}>Logout</button>
          </div>
        </div>

        {/* Content based on active section */}
        <div className="mt-6">
          {renderContent()} {/* Dynamically render content based on active section */}
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;
