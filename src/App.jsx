import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { dbConfig } from "./config/dbConfig"; // Import dbConfig
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import SalesDashboard from "./pages/DashboardSales";
import BusinessDashboard from "./pages/DashboardBusiness";
import HomePage from "./pages/HomePage";
import GetStartedPage from "./pages/GetStartedPage";
import "./App.css"; // Import Tailwind CSS

// Standalone ProtectedRoute Component
const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

// Dashboard Redirect Logic
const getDashboardRoute = (dashType) => {
  switch (dashType) {
    case "sales_dashboard":
      return "/sales-dashboard";
    case "business_dashboard":
      return "/business-dashboard";
    case "admin_dashboard":
      return "/admin-dashboard";
    default:
      return "/dashboard";
  }
};

const App = () => {
  const { user } = useAuth();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Initialize only once
    setInitialized(true);
  }, []);

  if (!initialized) {
    return <div>Loading...</div>; // Optional loading state
  }

  const redirectToDashboard = user ? getDashboardRoute(user.dash_type) : "/login";

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/getStarted" element={<GetStartedPage />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Login Route with Redirection */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to={redirectToDashboard} replace />}
        />

        {/* Default Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute element={<Dashboard />} />
          }
        />

        {/* Specific Dashboard Routes */}
        <Route path="/sales-dashboard" element={<ProtectedRoute element={<SalesDashboard />} />} />
        <Route path="/business-dashboard" element={<ProtectedRoute element={<BusinessDashboard />} />} />
      </Routes>
    </Router>
  );
};

// Wrap with AuthProvider
const AppWrapper = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWrapper;
