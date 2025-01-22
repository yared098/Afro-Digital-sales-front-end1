import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartLine, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import SalesProduct from './SalesProduct';

const SalesDashboard = () => {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState('products'); // Set default active section to 'products'

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
      // Assume signOut is a function you have defined for logging out
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const menuItems = [
    { name: 'Sales Overview', link: 'sales-overview', icon: FaChartLine, section: 'overview' },
    { name: 'Products', link: 'products', icon: FaChartLine, section: 'products' },
    { name: 'Orders', link: 'orders', icon: FaChartLine, section: 'orders' },
    { name: 'Notifications', link: 'notifications', icon: FaChartLine, section: 'notifications' },
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
        return <div>Orders Content</div>;
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
      <Sidebar menuItems={menuItems} onMenuClick={handleSectionChange} />

      {/* Main Dashboard Area */}
      <div className="flex-1 p-4 overflow-hidden">
        <div className="mt-6">
          {renderContent()} {/* Dynamically render content based on active section */}
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;
