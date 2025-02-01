import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const PremiumFeatures = ({ premiumFeatures, darkMode, onPurchase }) => {
  return (
    <div className={`w-full md:col-span-2 shadow-lg rounded-xl p-6 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
      <h3 className="text-xl font-semibold mb-4 text-center">💎 Premium Features</h3>
      <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
            <th className="p-3">Feature</th>
            <th className="p-3">Price</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {premiumFeatures.map((feature, index) => (
            <tr key={index} className="text-center border-b hover:bg-gray-200 dark:hover:bg-gray-700 transition">
              <td className="p-3 flex items-center justify-center space-x-2">
                <FaCheckCircle className="text-green-500" /> <span>{feature.name}</span>
              </td>
              <td className="p-3 font-semibold">{feature.price}</td>
              <td className="p-3">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  onClick={() => onPurchase(feature)}
                >
                  Pay
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PremiumFeatures;
