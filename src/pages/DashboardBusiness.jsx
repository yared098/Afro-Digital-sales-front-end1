import React, { useState } from "react";
import { FaBuilding, FaBell, FaClipboardList, FaShoppingCart, FaTags, FaHome, FaUser, FaSignOutAlt, FaBox, FaChartLine, FaCog, FaGavel } from "react-icons/fa";
import DashboardCard from '../components/DashboardCard';
import Sidebar from "../components/Sidebar";
import BusinessProducts from "./BusinessProducts";
import BusinessOrder from "./BusinessOrder";
import ProfilePage from "./ProfilePage";
import AdminSalesPage from "./AdminSalesPage";
import BusinessOverview from "./BusinessOverview";
import { useAuth } from "../context/AuthContext";
import ShowChart from '../components/ShowChart';

const BusinessDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [showNotifications, setShowNotifications] = useState(false);
  const { user, logout } = useAuth();
  const [chartType, setChartType] = useState('line');

  // Example notification counts
  const counts = {
    notifications: 5,
    orders: 8,
    products: 12,
    bids: 3,
  };
  const [stats, setStats] = useState({
    businesses: 0,
    sales: 0,
    orders: 0,
    products: 0,
  });


  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const notifications = [
    "New order received!",
    "Your product was approved.",
    "Reminder: Sales report available.",
    "New bid on your item!",
  ];
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Sales Over Time',
        data: [30, 50, 70, 90, 110],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 120,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  const menuItems = [
    { name: 'Overview', link: 'overview', icon: FaHome },
    { name: 'Orders', link: 'orders', icon: FaClipboardList },       // FaClipboardList for orders
    { name: 'Your Store', link: 'products', icon: FaBox },              // FaBox for products
    { name: 'Sales', link: 'sales', icon: FaChartLine },              // FaChartLine for sales
    { name: 'Profile', link: 'profile', icon: FaUser },              // FaChartLine for sales
    { name: 'Settings', link: 'settings', icon: FaCog },              // FaCog for settings
    { name: 'Logout', link: 'logout', icon: FaSignOutAlt },           // FaSignOutAlt for logout
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="mt-6 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <DashboardCard
                icon={<FaBuilding className="text-blue-500" />}
                label="Businesses"
                value={stats.businesses}
              />
              <DashboardCard
                icon={<FaChartLine className="text-green-500" />}
                label="Sales"
                value={stats.sales}
              />
              <DashboardCard
                icon={<FaShoppingCart className="text-orange-500" />}
                label="Orders"
                value={stats.orders}
              />
              <DashboardCard
                icon={<FaTags className="text-purple-500" />}
                label="Products"
                value={stats.products}
              />
            </div>

            {/* Chart */}
            <div className="p-4 bg-white rounded-lg shadow">
              <ShowChart chartType={chartType} chartData={chartData} chartOptions={chartOptions} />
            </div>
          </div>
        );
      case "products":
        return <BusinessProducts />;
      case "overview":
        return <BusinessOverview />;
      case "notifications":
        return (
          <div className="p-4 bg-white rounded shadow">
            <h2 className="mb-2 text-lg font-semibold">Notifications</h2>
            <ul>
              {notifications.map((note, index) => (
                <li key={index} className="py-2 border-b">{note}</li>
              ))}
            </ul>
          </div>
        );
      case "orders":
        return <BusinessOrder />;
      case "sales":
        return <AdminSalesPage />;
      case "profile":
        return <ProfilePage />;
      case "settings":
        return <div>Settings Content</div>;
      case "logout":
        logout();
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar menuItems={menuItems} onMenuClick={(section) => setActiveSection(section)} DashboardName={"Business Dash"} />

      {/* Main Content */}
      <div className="flex-1 p-4">
        <nav className="flex items-center justify-between p-4 bg-gray-800">
          <h1 className="text-xl text-white">Business Dashboard</h1>
          {/* Right-aligned circular icons */}
          <div className="flex space-x-4">
            {/* Notifications */}
            <div className="relative">
              <FaBell
                className="text-2xl text-white cursor-pointer hover:text-yellow-400"
                onClick={() => setShowNotifications(!showNotifications)}
              />
              {counts.notifications > 0 && (
                <span className="absolute px-2 text-xs text-white bg-red-500 rounded-full -top-2 -right-2">
                  {counts.notifications}
                </span>
              )}
              {showNotifications && (
                <div className="absolute right-0 z-10 w-48 p-2 mt-2 text-black bg-white rounded-lg shadow-lg">
                  <button
                    className="absolute text-sm text-gray-500 top-2 right-2"
                    onClick={() => setShowNotifications(false)}
                  >
                    <FaSignOutAlt size={12} />
                  </button>
                  <h3 className="pb-2 font-semibold border-b">Notifications</h3>
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
                className="text-2xl text-white cursor-pointer hover:text-green-400"
                onClick={() => handleSectionChange('orders')}
              />
              {counts.sales > 0 && (
                <span className="absolute px-2 text-xs text-white bg-green-500 rounded-full -top-2 -right-2">
                  {counts.sales}
                </span>
              )}
            </div>

            {/* Orders */}
            <div className="relative">
              <FaBox
                className="text-2xl text-white cursor-pointer hover:text-blue-400"
                onClick={() => handleSectionChange('orders')}
              />
              {counts.orders > 0 && (
                <span className="absolute px-2 text-xs text-white bg-blue-500 rounded-full -top-2 -right-2">
                  {counts.orders}
                </span>
              )}
            </div>
          </div>
          
        </nav>

        {/* Page Content */}
        <div className="mt-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default BusinessDashboard;
