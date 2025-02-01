import React, { useState } from "react";
import { FaGlobe } from "react-icons/fa"; // Make sure you have react-icons installed

const LanguageSelection = () => {
  const [darkMode, setDarkMode] = useState(false); // Assuming darkMode state is here
  const [language, setLanguage] = useState("English"); // Default language

  return (
    <div className={`shadow-lg rounded-xl p-5 transition-all duration-300 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
      <h3 className="text-lg font-semibold mb-2">🌍 Language Selection</h3>
      <div className="flex items-center space-x-2">
        <FaGlobe className="text-gray-500" />
        <select 
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className={`border p-2 rounded w-full transition-all duration-300 ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-gray-100 text-gray-900 border-gray-300"}`}
        >
          <option>English</option>
          <option>አማርኛ (Amharic)</option>
          <option>Afaan Oromoo (Oromic)</option>
          <option>ትግርኛ (Tigrigna)</option>
        </select>
      </div>
    </div>
  );
};

export default LanguageSelection;
