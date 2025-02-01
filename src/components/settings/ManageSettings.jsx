import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const ManageSettings = ({ darkMode, isPrivate, isLocked, togglePrivacy, toggleLock, toggleDarkMode }) => {
  return (
    <div className={`shadow-lg rounded-xl p-5 transition-all duration-300 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
      <h3 className="text-lg font-semibold mb-2">🔒 Manage Settings</h3>
      <div className="space-y-4">
        {/* Private Profile Toggle */}
        <div className="flex justify-between items-center">
          <span>Private Profile</span>
          <button 
            onClick={togglePrivacy} 
            className={`px-3 py-1 rounded transition-all duration-300 ${isPrivate ? "bg-red-500 text-white" : "bg-gray-300 text-gray-900"}`}
          >
            {isPrivate ? "Enabled" : "Disabled"}
          </button>
        </div>

        {/* Account Lock Toggle */}
        <div className="flex justify-between items-center">
          <span>Account Lock</span>
          <button 
            onClick={toggleLock} 
            className={`px-3 py-1 rounded transition-all duration-300 ${isLocked ? "bg-red-500 text-white" : "bg-gray-300 text-gray-900"}`}
          >
            {isLocked ? "Locked" : "Unlocked"}
          </button>
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex justify-between items-center">
          <span>Dark Mode</span>
          <button 
            onClick={toggleDarkMode} 
            className={`px-3 py-1 rounded transition-all duration-300 ${darkMode ? "bg-yellow-500 text-white" : "bg-gray-300 text-gray-900"}`}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageSettings;
