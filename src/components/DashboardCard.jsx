import React from 'react';

const DashboardCard = ({ title, number, icon, bgColor, textColor }) => (
  <div className={`bg-${bgColor} p-4 shadow-lg rounded-lg flex items-center justify-between`}>
    <div>
      <h3 className={`text-xl font-semibold text-${textColor}`}>{title}</h3>
      <p className={`text-2xl font-bold text-${textColor}`}>{number}</p>
    </div>
    <div className="text-gray-600">{icon}</div>
  </div>
);

export default DashboardCard;
