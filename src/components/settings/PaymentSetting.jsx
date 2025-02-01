import React, { useState } from "react";
import { FaCreditCard } from "react-icons/fa"; // Make sure you have react-icons installed

const PaymentSetting = () => {
  const [darkMode, setDarkMode] = useState(false); // Assuming darkMode state is here
  const [paymentStatus, setPaymentStatus] = useState("Master"); // Default status

  return (
    <div className={`shadow-lg rounded-xl p-5 transition-all duration-300 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
      <h3 className="text-lg font-semibold mb-2">💳 Payment Info</h3>
      <div className="flex justify-between items-center">
        <div>
          <p>Current Limit: <span className="font-semibold">$5000</span></p>
          <p>Status: <span className="font-semibold">{paymentStatus}</span></p>
        </div>
        <FaCreditCard className="text-4xl text-gray-500" />
      </div>
      <select 
        value={paymentStatus}
        onChange={(e) => setPaymentStatus(e.target.value)}
        className={`mt-3 border p-2 rounded w-full transition-all duration-300 ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-gray-100 text-gray-900 border-gray-300"}`}
      >
        <option>Master</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
    </div>
  );
};

export default PaymentSetting;
