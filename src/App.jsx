import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import SalesDashboard from "./pages/DashboardSales";
import BusinessDashboard from "./pages/DashboardBusiness";
import AdminDashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the role-based protected route

const App = () => {
   // Log the auth and database provider values from .env
   useEffect(() => {
    const authProvider = import.meta.env.VITE_AUTH_PROVIDER;
    const dbProvider = import.meta.env.VITE_DB_PROVIDER;

    console.log("Auth Provider:", authProvider);
    console.log("Database Provider:", dbProvider);
  }, []);
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          {/* Secure Dashboard Routes with Role-Based Access */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredDashType="default">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sales-dashboard"
            element={
              <ProtectedRoute requiredDashType="sales_dashboard">
                <SalesDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/business-dashboard"
            element={
              <ProtectedRoute requiredDashType="business_dashboard">
                <BusinessDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute requiredDashType="admin_dashboard">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
