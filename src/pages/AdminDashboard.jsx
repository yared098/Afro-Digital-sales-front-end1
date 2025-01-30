import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchData } from "../services/dbService"; // Import Firebase service

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      {user ? (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-md mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            Welcome, {user.displayName}
          </h2>
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4 shadow-md"
          />
          <p className="text-gray-700 mb-4">Email: {user.email}</p>
          <button
            onClick={logout}
            className="w-full py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <p className="text-lg text-gray-600">Please log in.</p>
      )}

      {/* Users List */}
      <div className="w-full max-w-3xl">
        {loading ? (
          <p className="text-lg text-gray-600">Loading users...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {users.length > 0 ? (
              users.map((user, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-semibold">{user.name}</h3>
                  <p className="text-gray-500">{user.email}</p>
                </div>
              ))
            ) : (
              <p>No users available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
