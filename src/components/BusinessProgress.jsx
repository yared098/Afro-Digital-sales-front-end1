import React from 'react';

const BusinessProgress = ({ progress, goal }) => (
  <div className="mt-10 bg-white p-6 shadow-lg rounded-lg">
    <h2 className="text-2xl font-semibold text-gray-700">Business Progress</h2>
    <div className="mt-4">
      <div className="h-6 bg-gray-200 rounded-full">
        <div
          className="h-full bg-green-500 rounded-full"
          style={{ width: `${(progress / goal) * 100}%` }}
        ></div>
      </div>
      <p className="mt-2 text-gray-500">{`${Math.round((progress / goal) * 100)}% of the goal has been achieved.`}</p>
    </div>
  </div>
);

export default BusinessProgress;
