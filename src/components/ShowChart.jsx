import React from 'react';
import { Line, Bar } from 'react-chartjs-2';  // Import both line and bar charts
import { Chart as ChartJS } from 'chart.js';  // Import Chart.js to use chart types

const ShowChart = ({ chartType, chartData, chartOptions }) => {
  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return <Line data={chartData} options={chartOptions} />;
      case 'bar':
        return <Bar data={chartData} options={chartOptions} />;
      default:
        return <div>No chart type selected</div>;
    }
  };

  return (
    <div className="p-6 mt-10 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-700">Dynamic Chart</h2>
      {/* Render the chart dynamically based on the chartType */}
      <div className="mt-6" style={{ height: '300px' }}>
        {renderChart()}
      </div>
    </div>
  );
};

export default ShowChart;
