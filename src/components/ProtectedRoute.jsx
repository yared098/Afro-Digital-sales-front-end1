import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const ProtectedRoute = ({ children, requiredDashType }) => {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();
  const [user, setUser] = useState(null);
  const [userDashType, setUserDashType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        // Fetch user data from Firestore
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setUser(currentUser);
          setUserDashType(userData.dash_type);
        } else {
          navigate("/login", { replace: true });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login", { replace: true });
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, db, navigate]);

  if (loading) {
    return <div>Loading...</div>; // Show loading while fetching user data
  }

  if (!user || userDashType !== requiredDashType) {
    // Redirect unauthorized users to their respective dashboards
    const dashboardRoutes = {
      sales_dashboard: "/sales-dashboard",
      business_dashboard: "/business-dashboard",
      admin_dashboard: "/admin-dashboard",
      default: "/dashboard",
    };

    navigate(dashboardRoutes[userDashType] || dashboardRoutes.default, { replace: true });
    return null;
  }

  return <>{children}</>; // Render children if authorized
};

export default ProtectedRoute;
