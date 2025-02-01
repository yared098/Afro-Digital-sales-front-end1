import React, { useState } from "react";
import { FaUserCircle, FaShareAlt } from "react-icons/fa"; // Make sure you have react-icons installed

const ProfileSettingShare = () => {
  const [darkMode, setDarkMode] = useState(false); // Assuming darkMode state is here
  const [username, setUsername] = useState("John Doe"); // Sample username

  return (
    <div className={`shadow-lg rounded-xl p-5 transition-all duration-300 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
      <h3 className="text-lg font-semibold mb-2">🔗 Share Profile</h3>
      <div className="flex items-center space-x-4">
        <FaUserCircle className="text-5xl text-gray-500" />
        <div>
          <p className="font-semibold text-lg">{username}</p>
          <p className="text-sm text-gray-500">@{username.toLowerCase().replace(" ", "")}</p>
          <p className="text-sm text-blue-500 cursor-pointer hover:underline">
            https://mysite.com/{username.toLowerCase().replace(" ", "")}
          </p>
        </div>
        <FaShareAlt className="text-gray-500 cursor-pointer hover:text-blue-500 transition" />
      </div>
    </div>
  );
};

export default ProfileSettingShare;
