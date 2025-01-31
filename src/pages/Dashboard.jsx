import React, { useState, useEffect } from 'react';
import '../chartConfig';
import { FaHome, FaUser, FaCog, FaSignOutAlt,FaClipboardList, FaBuilding, FaChartLine, FaShoppingCart, FaStore, FaTags } from 'react-icons/fa';
import { useAuth } from "../context/AuthContext";
import { fetchData } from "../services/dbService"; // Import Firebase service
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardCard from '../components/DashboardCard';
import AdminSalesPage from "./AdminSalesPage";
import OrdersList from "./OrderLIst";
import AdminBusinessPage from "./AdminBusinessPage";
import ShowChart from '../components/ShowChart';


const Dashboard = () => {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState([]);
  console.log("Admin user info",user)
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [chartType, setChartType] = useState('line');

  const [activeSection, setActiveSection] = useState('overview');
  const [stats, setStats] = useState({
    businesses: 0,
    sales: 0,
    orders: 0,
    products: 0,
  });
  // Fetch user data from Firebase
  useEffect(() => {
    const getUsers = async () => {
      try {
        const userData = await fetchData();
        setUsers(userData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    if (user) {
      getUsers(); // Only fetch users if logged in
    }
  }, [user]);




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
    { name: 'Business', link: 'business', icon: FaBuilding },
    { name: 'Sales', link: 'sales', icon: FaChartLine },
    { name: 'Orders', link: 'orders', icon: FaClipboardList },
    { name: 'Settings', link: 'settings', icon: FaCog },
    { name: 'Logout', link: 'logout', icon: FaSignOutAlt },
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
     
      case 'business':
        return <AdminBusinessPage />

      case 'orders':
          return <OrdersList />
      case 'sales':
        return <AdminSalesPage />
      case 'settings':
        return <h2>Settings Section</h2>;
      case 'logout':
        logout();
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        menuItems={menuItems}
        onMenuClick={(section) => setActiveSection(section)}
        DashboardName="defoult dash"
      />

      <div className="flex-1 p-4">
        <nav className="flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow">
          <h1 className="text-xl font-bold text-white">Dashboard</h1>
          <div className="flex items-center space-x-4">
            {user && (
              <>
                <img
                  src={user.photoURL || 'https://via.placeholder.com/40'}
                  alt="User"
                  className="w-10 h-10 border-2 border-gray-300 rounded-full"
                />
                <span className="text-white">{user.displayName || 'Anonymous'}</span>
              </>
            )}
          </div>
        </nav>
        <div className="mt-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
