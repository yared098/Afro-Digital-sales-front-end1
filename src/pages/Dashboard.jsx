// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { signOut } from '../services/auth/authService';  // Import the signOut function

// const Dashboard = () => {
//   const navigate = useNavigate();

//   // Handle logout functionality
//   const handleLogout = async () => {
//     try {
//       await signOut();  // Sign the user out
//       navigate('/login');  // Redirect to the login page after logout
//     } catch (error) {
//       console.error('Error signing out:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Navbar */}
//       <nav className="bg-blue-500 p-4 flex justify-between items-center">
//         <h1 className="text-white text-xl">Dashboard</h1>
//         <button
//           onClick={handleLogout}
//           className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
//         >
//           Log Out
//         </button>
//       </nav>

//       {/* Dashboard Content */}
//       <div className="p-4">
//         <h1 className="text-3xl font-bold">Welcome to the Dashboard</h1>
//         <p className="mt-2">This is a placeholder for your dashboard content.</p>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../services/auth/authService'; // Import the signOut function
import Sidebar from '../components/Sidebar';  // Import the Sidebar component

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

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      
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

        {/* Dashboard Content */}
        <div className="p-4">
          <h1 className="text-3xl font-bold">Welcome to the Dashboard</h1>
          <p className="mt-2">This is a placeholder for your dashboard content.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
