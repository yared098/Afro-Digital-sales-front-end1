import React, { useState, useEffect } from 'react';
import '../chartConfig'; // Import the chart configuration to register components
import { FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Import icons
import { useNavigate } from 'react-router-dom';
import { signOut } from '../services/auth/authService'; // Import the signOut function
import Sidebar from '../components/Sidebar'; // Import the Sidebar component
import DashboardCard from '../components/DashboardCard'; // Import DashboardCard
import BusinessProgress from '../components/BusinessProgress'; // Import BusinessProgress
import ShowChart from '../components/ShowChart'; // Import ShowChart component

const Dashboard = () => {
  const navigate = useNavigate();

  const [chartType, setChartType] = useState('line'); // 'line' or 'bar'
  const [user, setUser] = useState(null); // State to hold user info

  useEffect(() => {
    // Retrieve user info from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // Parse and set the user object
    }
  }, []);

  // Handle logout functionality
  const handleLogout = async () => {
    try {
      await signOut(); // Sign the user out
      localStorage.removeItem('user'); // Clear user info from localStorage
      navigate('/login'); // Redirect to the login page after logout
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May'], // Example labels
    datasets: [
      {
        label: 'Sales Over Time',
        data: [30, 50, 70, 90, 110], // Example sales data
        borderColor: 'rgba(75, 192, 192, 1)', // Line color for line chart
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fill color for line chart
        borderWidth: 2,
        fill: true, // Enable the fill under the line
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 120, // Max value for y-axis
      },
    },
    maintainAspectRatio: false, // Allow chart resizing
  };

  const menuItems = [
    { name: 'Overview', link: '/overview', icon: FaHome },
    { name: 'Profile', link: '/profile', icon: FaUser },
    { name: 'Settings', link: '/settings', icon: FaCog },
    { name: 'Logout', link: '/logout', icon: FaSignOutAlt },
  ];

  const cardData = [
    { title: 'Users', number: 1000, icon: '👥', bgColor: 'blue-500', textColor: 'white' },
    { title: 'Businesses', number: 50, icon: '🏢', bgColor: 'green-500', textColor: 'white' },
    { title: 'Sales', number: 1500, icon: '💵', bgColor: 'yellow-500', textColor: 'white' },
    { title: 'Reviews', number: 120, icon: '⭐', bgColor: 'red-500', textColor: 'white' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar menuItems={menuItems} />
      
      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Navbar */}
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
          <h1 className="text-white text-xl">Dashboard</h1>
          <div className="flex items-center space-x-4">
            {user && (
              <>
                {/* Profile Picture */}
                <img
                  src={user.photoURL || 'https://via.placeholder.com/40'}
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
                {/* Username */}
                <span className="text-white">{user.displayName || 'Anonymous'}</span>
              </>
            )}
            <button
              onClick={handleLogout}
              className="text-white bg-yellow-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Log Out
            </button>
          </div>
        </nav>

        {/* Top Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {cardData.map((card, index) => (
            <DashboardCard
              key={index}
              title={card.title}
              number={card.number}
              icon={card.icon}
              bgColor={card.bgColor}
              textColor={card.textColor}
            />
          ))}
        </div>

        {/* Dynamic Chart */}
        <ShowChart
          chartType={chartType} // Pass chart type ('line' or 'bar')
          chartData={chartData} // Pass the chart data
          chartOptions={chartOptions} // Pass the chart options
        />
      </div>
    </div>
  );
};

export default Dashboard;