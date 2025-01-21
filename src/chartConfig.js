// chartConfig.js
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components
ChartJS.register(
  CategoryScale,  // x-axis scale
  LinearScale,    // y-axis scale
  BarElement,     // Bar element for bar chart
  PointElement,   // Point element for line chart
  LineElement,    // Line element for line chart
  Title,          // Title component
  Tooltip,        // Tooltip component
  Legend          // Legend component
);

export default ChartJS;  // Export the ChartJS config
