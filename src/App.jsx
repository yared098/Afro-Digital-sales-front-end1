import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
// import SalesDashboard from './pages/SalesDashboard';
// import BusinessDashboard from './pages/BusinessDashboard';
import { initializeAuth } from './services/auth/authService';
import BusinessProducts from './pages/BusinessProducts';
import SalesDashboard from './pages/SalesDashboard';
import BusinessDashboard from './pages/BusinessDashboard';
import './App.css'; // Import Tailwind CSS here
import HomePage from './pages/HomePage';

function App() {
  // Initialize Firebase Auth
  initializeAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Default route */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
     
        <Route path="/dashboard" element={<BusinessDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
