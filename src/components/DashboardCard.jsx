import React from 'react';

const DashboardCard = ({ icon, label, value }) => (
  <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
    <div className="p-3 bg-gray-100 rounded-full">{icon}</div>
    <div>
      <h3 className="text-xl font-bold">{value}</h3>
      <p className="text-gray-500">{label}</p>
    </div>
  </div>
);
export default DashboardCard;

