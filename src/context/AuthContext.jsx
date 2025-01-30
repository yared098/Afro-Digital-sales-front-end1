

import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { signInWithGoogle, signInWithFacebook, logout } from "../services/authService";

// Helper function to get user from localStorage
const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUserFromLocalStorage()); // Initialize with localStorage data

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // If Firebase user exists, save to localStorage and set state
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          provider: firebaseUser.providerData[0]?.providerId || "firebase",
          dash_type: firebaseUser.dash_type 
        };
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
      } else {
        // If no user logged in, clear localStorage
        localStorage.removeItem("user");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signInWithFacebook, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

