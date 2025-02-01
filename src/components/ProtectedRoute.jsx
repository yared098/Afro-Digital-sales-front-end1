import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// Import logo or add animated GIF path
import logo from "../assets/logo.png"; // Update this with the actual path to your animated logo

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
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        {/* Center the content with flexbox */}
        <div className="text-center">
          {/* Circular loading spinner with zoom-in animation */}
          <div className="flex items-center justify-center w-32 h-32 mx-auto bg-green-500 rounded-full animate-zoom-in">
            <img src={logo} alt="Afro Digital Sales Logo" className="w-24 h-24 rounded-full animate-spin" />
          </div>
          <p className="mt-4 text-lg font-semibold text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || userDashType !== requiredDashType) {
    // Redirect unauthorized users to their respective dashboards or custom routes based on dash_type
    const dashboardRoutes = {
      sales_dashboard: "/sales-dashboard",
      business_dashboard: "/business-dashboard",
      admin_dashboard: "/admin-dashboard",
      default: "/dashboard",
    };

    // If there's a custom route for the user's dash_type, navigate accordingly
    if (userDashType) {
      const customRoute = `/custom/${userDashType}`;
      navigate(customRoute, { replace: true });
      return null;
    }

    // Default fallback
    navigate(dashboardRoutes[userDashType] || dashboardRoutes.default, { replace: true });
    return null;
  }

  // Render children if authorized and dash_type matches
  return <>{children}</>;
};

export default ProtectedRoute;
