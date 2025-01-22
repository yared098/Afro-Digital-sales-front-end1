import React, { useState, useEffect } from 'react';
import '../chartConfig';
import { FaHome, FaUser, FaCog, FaSignOutAlt, FaBuilding, FaChartLine } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';
import { signOut } from '../services/auth/authService';
import Sidebar from '../components/Sidebar';
import DashboardCard from '../components/DashboardCard';
import AdminSalesPage from "./AdminSalesPage";
import AdminBusinessPage from "./AdminBusinessPage";
import ShowChart from '../components/ShowChart';

const Dashboard = () => {
  const navigate = useNavigate();
  const [chartType, setChartType] = useState('line');
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

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
  };

  const menuItems = [
    { name: 'Overview', link: 'overview', icon: FaHome }, // Overview icon
    { name: 'Profile', link: 'profile', icon: FaUser }, // Profile icon
    { name: 'Business', link: 'business', icon: FaBuilding }, // Business icon
    { name: 'Sales', link: 'sales', icon: FaChartLine }, // Sales icon
    { name: 'Settings', link: 'settings', icon: FaCog }, // Settings icon
    { name: 'Logout', link: 'logout', icon: FaSignOutAlt }, // Logout icon
  ];

  

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return ( <div className="mt-6 bg-white p-4 rounded-lg shadow">
          <ShowChart chartType={chartType} chartData={chartData} chartOptions={chartOptions} />
        </div> );
      case 'profile':
        return <h2>Profile Section</h2>;
      case 'business':
        return  <AdminBusinessPage/>
      case 'sales':
          return <AdminSalesPage/>
      case 'settings':
          return <h2>Settings Section</h2>;
      case 'logout':
        handleLogout();
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        menuItems={menuItems}
        onMenuClick={(section) => setActiveSection(section)}
        DashboardName="Admin"
      />

      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Navbar */}
        <nav className="bg-gray-800 p-4 flex justify-between items-center rounded-lg shadow">
          <h1 className="text-white text-xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            {user && (
              <>
                <img
                  src={user.photoURL || 'https://via.placeholder.com/40'}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-gray-300"
                />
                <span className="text-white">{user.displayName || 'Anonymous'}</span>
              </>
            )}
            
          </div>
        </nav>
        <div className="mt-6">{renderContent()}</div>
        {/* Dynamic Content */}

       
        
      </div>
    </div>
  );
};

export default Dashboard;
