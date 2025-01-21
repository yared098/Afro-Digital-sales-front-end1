import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../services/auth/authService'; // Import the signOut function
import Sidebar from '../components/Sidebar';  // Import the Sidebar component
import DashboardCard from '../components/DashboardCard';  // Import DashboardCard
import BusinessProgress from '../components/BusinessProgress';  // Import BusinessProgress

const Dashboard = () => {
  const navigate = useNavigate();

  // Handle logout functionality
  const handleLogout = async () => {
    try {
      await signOut();  // Sign the user out
      navigate('/login');  // Redirect to the login page after logout
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Data to be passed as props
  const menuItems = [
    { name: 'Overview', link: '#', icon: '📊' },
    { name: 'Settings', link: '#', icon: '⚙️' },
    { name: 'Profile', link: '#', icon: '👤' },
    { name: 'Reports', link: '#', icon: '📈' },
  ];

  const cardData = [
    { title: 'Users', number: 1000, icon: '👥', bgColor: 'blue-500', textColor: 'white' },
    { title: 'Businesses', number: 50, icon: '🏢', bgColor: 'green-500', textColor: 'white' },
    { title: 'Sales', number: 1500, icon: '💵', bgColor: 'yellow-500', textColor: 'white' },
    { title: 'Reviews', number: 120, icon: '⭐', bgColor: 'red-500', textColor: 'white' },
  ];

  const businessProgressData = {
    progress: 60,
    goal: 100,
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar menuItems={menuItems} />
      
      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Navbar */}
        <nav className="bg-blue-500 p-4 flex justify-between items-center">
          <h1 className="text-white text-xl">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Log Out
          </button>
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

        {/* Business Progress */}
        <BusinessProgress
          progress={businessProgressData.progress}
          goal={businessProgressData.goal}
        />

        {/* Footer */}
        <footer className="bg-blue-500 p-4 mt-10 text-white text-center">
          <p>&copy; 2025 Your Company. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
