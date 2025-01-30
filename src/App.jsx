import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { dbConfig } from "./config/dbConfig"; // Import dbConfig
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import SalesDashboard from "./pages/SalesDashboard";
import BusinessDashboard from "./pages/BusinessDashboard";
import HomePage from "./pages/HomePage";
import GetStartedPage from "./pages/GetStartedPage";
import "./App.css"; // Import Tailwind CSS

const App = () => {
  const { user } = useAuth();

  // Log the current database provider (for debugging purposes)
  console.log("Current DB Provider:", dbConfig.provider);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/getStarted" element={<GetStartedPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route
          path="/dashboard"
          element={
            user ? (
              <>
                <Dashboard />
                <p className="text-center text-gray-600">
                  Using {dbConfig.provider} as the database provider
                </p>
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/sales-dashboard" element={<SalesDashboard />} />
        <Route path="/business-dashboard" element={<BusinessDashboard />} />
      </Routes>
    </Router>
  );
};

const AppWrapper = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWrapper;
