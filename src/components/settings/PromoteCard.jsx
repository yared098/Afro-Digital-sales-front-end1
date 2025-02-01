import React, { useState } from "react";
import { FaTag } from "react-icons/fa"; // Make sure you have react-icons installed

const PromotionSetting = () => {
  const [darkMode, setDarkMode] = useState(false); // Assuming darkMode state is here

  return (
    <div className={`shadow-lg rounded-xl p-5 transition-all duration-300 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
      <h3 className="text-lg font-semibold mb-2">🚀 Promote My Product</h3>
      <div className="flex justify-between items-center">
        <p>Boost your sales by promoting your product!</p>
        <FaTag className="text-4xl text-gray-500" />
      </div>
      <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition">
        Promote Now
      </button>
    </div>
  );
};

export default PromotionSetting;
