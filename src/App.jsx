import React, { useEffect, useState } from "react";
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
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const App = () => {
  const [userDashType, setUserDashType] = useState(null);

  // Log the auth and database provider values from .env
  useEffect(() => {
    const authProvider = import.meta.env.VITE_AUTH_PROVIDER;
    const dbProvider = import.meta.env.VITE_DB_PROVIDER;

    console.log("Auth Provider:", authProvider);
    console.log("Database Provider:", dbProvider);
    
    // Fetch user data and dash_type if the user is authenticated
    const auth = getAuth();
    const db = getFirestore();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setUserDashType(userData.dash_type); // Set user's dash_type
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Redirect user based on their dash_type if user data exists
  const getRedirectPath = () => {
    if (userDashType) {
      // Dynamically redirect based on dash_type
      const dashboardRoutes = {
        sales_dashboard: "/sales-dashboard",
        business_dashboard: "/business-dashboard",
        admin_dashboard: "/admin-dashboard",
        default: "/dashboard",
      };

      return dashboardRoutes[userDashType] || dashboardRoutes.default;
    }
    return "/";
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={userDashType ? <Navigate to={getRedirectPath()} /> : <HomePage />}
          />
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
