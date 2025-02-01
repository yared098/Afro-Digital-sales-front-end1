import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartLine, FaBox, FaShoppingCart, FaBell, FaCog, FaSignOutAlt, FaUserAlt, FaClipboardList } from 'react-icons/fa';

import Sidebar from '../components/Sidebar';
import SalesProduct from './SalesProduct';
import SalesOrder from "./SalesOrder";
import { useAuth } from "../context/AuthContext";
import ProfilePage from './ProfilePage';

const SalesDashboard = () => {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState('products');
  const [searchQuery, setSearchQuery] = useState('');
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

  const [showNotifications, setShowNotifications] = useState(false);
  const [counts, setCounts] = useState({
    notifications: 5,
    sales: 3,
    orders: 10,
  });

  const [notifications] = useState([
    'New sale received',
    'Order placed for Product A',
    'Payment confirmation received',
    'New customer registration',
    'Product B is low on stock',
  ]);

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const menuItems = [
    { name: 'Sales Overview', link: 'sales-overview', icon: FaChartLine, section: 'overview' },
    { name: 'Products', link: 'products', icon: FaBox, section: 'products' },
    { name: 'Orders', link: 'orders', icon: FaShoppingCart, section: 'orders' },
    { name: 'Notifications', link: 'notifications', icon: FaBell, section: 'notifications' },
    { name: 'Settings', link: 'settings', icon: FaCog, section: 'settings' },
    { name: 'Profile', link: 'profile', icon: FaUserAlt, section: 'profile' },
    { name: 'Overall', link: 'overall', icon: FaClipboardList, section: 'overall' },
    { name: 'Logout', link: 'logout', icon: FaSignOutAlt, section: 'logout' },
  ];

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'products':
        return <SalesProduct products={products} />;
      case 'overview':
        return <div>Sales Overview Content</div>;
      case 'notifications':
        return <div>Notifications Content</div>;
      case 'orders':
        return <SalesOrder />;
      case 'profile':
        return <ProfilePage />;
      case 'settings':
        return <div>Settings Content</div>;
      case 'overall':
        return <div>Overall Summary Content</div>; // Add content for overall section
      case 'profile':
          return <ProfilePage />;
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
      <div className="flex-1 p-4 overflow-hidden relative">
        <div className="flex justify-between items-center mb-6">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded-lg w-1/3"
          />

          {/* Right-aligned circular icons */}
          <div className="flex space-x-4">
            {/* Notifications */}
            <div className="relative">
              <FaBell
                className="text-white text-2xl cursor-pointer hover:text-yellow-400"
                onClick={() => setShowNotifications(!showNotifications)}
              />
              {counts.notifications > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                  {counts.notifications}
                </span>
              )}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg p-2 z-10">
                  <button
                    className="absolute top-2 right-2 text-sm text-gray-500"
                    onClick={() => setShowNotifications(false)}
                  >
                    <FaSignOutAlt size={12} />
                  </button>
                  <h3 className="font-semibold border-b pb-2">Notifications</h3>
                  <ul>
                    {notifications.map((note, index) => (
                      <li key={index} className="py-1 border-b last:border-b-0">{note}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sales */}
            <div className="relative">
              <FaShoppingCart
                className="text-white text-2xl cursor-pointer hover:text-green-400"
                onClick={() => handleSectionChange('orders')}
              />
              {counts.sales > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full px-2">
                  {counts.sales}
                </span>
              )}
            </div>

            {/* Orders */}
            <div className="relative">
              <FaBox
                className="text-white text-2xl cursor-pointer hover:text-blue-400"
                onClick={() => handleSectionChange('orders')}
              />
              {counts.orders > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-2">
                  {counts.orders}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content based on active section */}
        <div className="mt-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;
