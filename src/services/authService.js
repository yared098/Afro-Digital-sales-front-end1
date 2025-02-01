

import { auth, googleProvider, facebookProvider } from "../config/firebaseConfig";
import { supabaseConfig } from "../config/supabaseConfig"; // Supabase client
import { signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword as firebaseSignInWithEmail } from "firebase/auth";
import axios from "axios"; // For API calls
import { authConfig } from '../config/authConfig'; // Import the authConfig object
import { addUserDataToFirebase,getUserByIdFromFirebase } from "./firebaseService";

const authProvider = authConfig.provider; // Access the provider from authConfig

// Firebase and Supabase authentication methods
let signUpWithEmailAndPassword, signInWithEmailAndPassword, signInWithGoogle, signInWithFacebook, signInWithInstagram, signInWithProvider, logout;

// Helper function to save user to localStorage
const saveUserToLocalStorage = (userData) => {
  localStorage.setItem("user", JSON.stringify(userData));
};

// Helper function to get user from localStorage
 export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};


// Firebase authentication functions
if (authProvider === "firebase") {
  signUpWithEmailAndPassword = async (email, password, username, phoneNumber, dashType) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userData = {
        uid: user.uid,
        username,
        email: user.email,
        phoneNumber,
        provider: 'email',
        dash_type: dashType || "sales_dashboard"
      };

      await addUserDataToFirebase("users",userData); // Save user to database (Firebase/MySQL)
      saveUserToLocalStorage(userData);

      return userData;
    } catch (error) {
      console.error("Firebase Sign-up Error:", error);
      throw error;
    }
  };

  signInWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await firebaseSignInWithEmail(auth, email, password);
      const user = userCredential.user;

      const userData = {
        uid: user.uid,
        email: user.email,
        provider: 'email'
      };

      await addUserDataToFirebase("users",userData);
      saveUserToLocalStorage(userData);

      return userData;
    } catch (error) {
      console.error("Firebase Sign-in Error:", error);
      return null;
    }
  };

  signInWithGoogle = async () => {
    return await signInWithProvider("google");
  };

  signInWithFacebook = async () => {
    return await signInWithProvider("facebook");
  };

  signInWithInstagram = async () => {
    return await signInWithProvider("instagram");
  };

  signInWithProvider = async (provider) => {
    try {
      let selectedProvider;
      switch (provider) {
        case 'google':
          selectedProvider = googleProvider;
          break;
        case 'facebook':
          selectedProvider = facebookProvider;
          break;
        default:
          throw new Error("Unsupported provider");
      }

      const result = await signInWithPopup(auth, selectedProvider);
      const user = result.user;

      let userData = await getUserByIdFromFirebase(user.uid);
      if (!userData) {
        userData = {
          uid: user.uid,
          email: user.email,
          provider: provider,
          dash_type: 'business_dashboard',
        };
        await addUserDataToFirebase("users",userData); // Save new user
      }

      saveUserToLocalStorage(userData);
      return userData;
    } catch (error) {
      console.error(`${provider.charAt(0).toUpperCase() + provider.slice(1)} Sign-in Error:`, error);
      return null;
    }
  };

  logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Firebase Logout Error:", error);
    }
  };
}

// Supabase authentication functions
else if (authProvider === "supabase") {
  signUpWithEmailAndPassword = async (email, password, username, phoneNumber, dashType) => {
    try {
      const { user, error } = await supabaseConfig.auth.signUp({ email, password });

      if (error) throw error;

      const userData = {
        uid: user.id,
        username,
        email: user.email,
        phoneNumber,
        provider: 'email',
        dash_type: dashType,
      };

      await addUserDataToFirebase("users",userData); // Save user to Supabase/MySQL
      saveUserToLocalStorage(userData);

      return userData;
    } catch (error) {
      console.error("Supabase Sign-up Error:", error);
      throw error;
    }
  };

  signInWithEmailAndPassword = async (email, password) => {
    try {
      const { user, error } = await supabaseConfig.auth.signInWithPassword({ email, password });

      if (error) throw error;

      const userData = {
        uid: user.id,
        email: user.email,
        provider: 'email',
      };

      await addUserDataToFirebase("users",userData);
      saveUserToLocalStorage(userData);

      return userData;
    } catch (error) {
      console.error("Supabase Sign-in Error:", error);
      return null;
    }
  };

  signInWithGoogle = async () => {
    return await signInWithProvider("google");
  };

  signInWithFacebook = async () => {
    return await signInWithProvider("facebook");
  };

  signInWithInstagram = async () => {
    return await signInWithProvider("instagram");
  };

  signInWithProvider = async (provider) => {
    try {
      const { user, error } = await supabaseConfig.auth.signInWithOAuth({ provider });

      if (error) throw error;

      const userData = {
        uid: user.id,
        email: user.email,
        provider: provider,
        dash_type: 'business_dashboard',
      };

      await addUserDataToFirebase("users",userData); // Save new user
      saveUserToLocalStorage(userData);

      return userData;
    } catch (error) {
      console.error(`${provider.charAt(0).toUpperCase() + provider.slice(1)} Sign-in Error:`, error);
      return null;
    }
  };

  logout = async () => {
    try {
      await supabaseConfig.auth.signOut();
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Supabase Logout Error:", error);
    }
  };
}

// API authentication functions (Custom API)
else if (authProvider === "api") {
  const apiUrl = VITE_API_URL; // The base URL for your authentication API

  signUpWithEmailAndPassword = async (email, password, username, phoneNumber, dashType) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, {
        email,
        password,
        username,
        phoneNumber,
        dash_type: dashType,
      });

      const userData = response.data.user;

      saveUserToLocalStorage(userData);
      await addUserDataToFirebase("users",userData); // Save user to your database (MySQL or MongoDB)

      return userData;
    } catch (error) {
      console.error("API Sign-up Error:", error);
      throw error;
    }
  };

  signInWithEmailAndPassword = async (email, password) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/signin`, { email, password });

      const userData = response.data.user;

      saveUserToLocalStorage(userData);
      await addUserDataToFirebase("users",userData); // Save user to your database (MySQL or MongoDB)

      return userData;
    } catch (error) {
      console.error("API Sign-in Error:", error);
      return null;
    }
  };

  signInWithGoogle = async () => {
    return await signInWithProvider("google");
  };

  signInWithFacebook = async () => {
    return await signInWithProvider("facebook");
  };

  signInWithInstagram = async () => {
    return await signInWithProvider("instagram");
  };

  signInWithProvider = async (provider) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/oauth`, { provider });
      const userData = response.data.user;

      saveUserToLocalStorage(userData);
      await addUserDataToFirebase("users",userData); // Save new user to your database (MySQL or MongoDB)

      return userData;
    } catch (error) {
      console.error(`API ${provider.charAt(0).toUpperCase() + provider.slice(1)} Sign-in Error:`, error);
      return null;
    }
  };

  logout = async () => {
    try {
      await axios.post(`${apiUrl}/auth/logout`);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("API Logout Error:", error);
    }
  };
}

// Export the authentication methods
export {
  signUpWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithGoogle,
  signInWithFacebook,
  signInWithInstagram,
  logout,
  signInWithProvider
};

