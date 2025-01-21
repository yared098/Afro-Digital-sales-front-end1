import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { initializeAuth } from '../services/auth/authService'; // Ensure this import is correct

// Initialize Firebase auth to check authentication state
initializeAuth();

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate(); // Use useNavigate hook to programmatically navigate
  const auth = getAuth(); // Get auth instance
  const user = auth.currentUser; // Check if a user is logged in

  useEffect(() => {
    if (!user) {
      // Redirect to login if no user is found
      navigate('/login');
    }
  }, [user, navigate]); // Run the effect whenever the user state changes

  if (!user) {
    // Optionally, you can render a loading state or a placeholder until the navigation happens
    return null;
  }

  return children; // Render protected content if user is logged in
};

export default ProtectedRoute;
