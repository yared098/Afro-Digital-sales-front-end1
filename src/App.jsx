import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SalesDashboard from './pages/SalesDashboard';
import BusinessDashboard from './pages/BusinessDashboard';
import { initializeAuth } from './services/auth/authService';
import './App.css'; // Import Tailwind CSS here

function App() {
  // Initialize Firebase Auth
  initializeAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Default route */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
