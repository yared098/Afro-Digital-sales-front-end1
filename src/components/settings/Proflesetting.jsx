import React, { useState } from "react";

const ProfileUpdateCard = ({ darkMode, user, onUpdateUser }) => {
  const [username, setUsername] = useState(user.username || "");
  const [profileImage, setProfileImage] = useState(user.profileImage || null);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    onUpdateUser({ ...user, username: e.target.value });
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    onUpdateUser({ ...user, profileImage: file });
  };

  return (
    <div className={`shadow-lg rounded-xl p-5 transition-all duration-300 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
      <h3 className="text-lg font-semibold mb-2">📝 Update Profile</h3>
      <div className="flex flex-col space-y-3">
        {/* Username Field */}
        <div>
          <label className="block text-sm font-medium">Username</label>
          <input 
            type="text" 
            value={username} 
            onChange={handleUsernameChange} 
            className={`border p-2 rounded w-full transition-all duration-300 ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-gray-100 text-gray-900 border-gray-300"}`}
          />
        </div>

        {/* Profile Image Upload */}
        <div>
          <label className="block text-sm font-medium">Profile Image / Logo</label>
          <input 
            type="file" 
            onChange={handleProfileImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdateCard;
