import { useState } from "react";
import { FaUserCircle, FaLock,FaCheckCircle, FaGlobe, FaMoon, FaSun, FaShareAlt, FaCreditCard, FaUpload, FaTag } from "react-icons/fa";

const SalesSetting = () => {
  const [darkMode, setDarkMode] = useState(false);
 
  const [isPrivate, setIsPrivate] = useState(false);
  const [isLocked, setIsLocked] = useState(false);



  
  const premiumFeatures = [
    { name: "Upload Unlimited Products", price: "3 USD" },
    { name: "Business Analysis", price: "4 USD" },
    { name: "Priority Support", price: "5 USD" },
    { name: "Advanced Analytics", price: "7 USD" },
    { name: "Custom Branding", price: "10 USD" }
  ];

  return (
    <div className={`min-h-screen p-6 transition-all duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <h2 className="text-3xl font-bold mb-6 text-center">⚙️ Settings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
    </div>
    </div>
  );
};

export default SalesSetting;
