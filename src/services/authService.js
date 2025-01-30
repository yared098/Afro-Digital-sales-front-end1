import { auth, googleProvider, facebookProvider } from "../config/firebaseConfig";
import { 
  signInWithPopup, 
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword as firebaseSignInWithEmail 
} from "firebase/auth";
import { saveUserToDatabase, fetchUserById } from "./dbService";


// Helper function to save user to localStorage
const saveUserToLocalStorage = (userData) => {
  localStorage.setItem("user", JSON.stringify(userData));
};

// Helper function to get user from localStorage
 export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Sign up with email and password
export const signUpWithEmailAndPassword = async (email, password, username, phoneNumber,dashType) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create user object with additional details
    const userData = {
      uid: user.uid,
      username,
      email: user.email,
      phoneNumber,
      provider: email,
      dash_type:dashType,
      
    };

    // Save user details in the database
    await saveUserToDatabase(userData);
    // Save user data to localStorage
    saveUserToLocalStorage(userData);

    return userData;
  } catch (error) {
    console.error("Email/Password Sign-up Error:", error);
    throw error;
  }
};

/** 🔹 Sign in with Email and Password */
export const signInWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await firebaseSignInWithEmail(auth, email, password);
    const user = userCredential.user;
    console.log("Authoservice ",user)

    console.log("AuthService - Facebook User:", user.uid);

    // Fetch user data from the database
    const userData = await fetchUserById(user.uid);

    // Save user data to localStorage
    saveUserToLocalStorage(userData);
    console.log("successfully saved user data",userData)
    return userData; // Return fetched user data
  } catch (error) {
    console.error("Email/Password Sign-in Error:", error);
    return null;
  }
};

/** 🔹 Sign in with Google */
export const signInWithGoogle = async () => {
  return await signInWithProvider("google");
};

/** 🔹 Sign in with Facebook */
export const signInWithFacebook = async () => {
  return await signInWithProvider("facebook");
};

/** 🔹 Sign in with Instagram */
export const signInWithInstagram = async () => {
  return await signInWithProvider("instagram");
};

/** 🔹 Sign in with Telegram */
export const signInWithTelegram = async () => {
  return await signInWithProvider("telegram");
};

/** 🔹 Sign in with a specific provider dynamically */
export const signInWithProvider = async (provider) => {
  try {
    let selectedProvider;
    switch (provider) {
      case 'google':
        selectedProvider = googleProvider;
        break;
      case 'facebook':
        selectedProvider = facebookProvider;
        break;
      case 'instagram':
        selectedProvider = instagramProvider;
        break;
      case 'telegram':
        selectedProvider = telegramProvider;
        break;
      default:
        throw new Error("Unsupported provider");
    }

    const result = await signInWithPopup(auth, selectedProvider);
    const user = result.user;

    // Check if user exists in the database
    let userData = await fetchUserById(user.uid);
    if (!userData) {
      userData = {
        uid: user.uid,
        email: user.email,
        provider: provider,
        createdAt: new Date().toISOString(),
        dash_type:'business_dashboard',
        
      };

      // Save new user to the selected database
      await saveUserToDatabase(userData);

    }
    // Save user data to localStorage
    saveUserToLocalStorage(userData);

    return userData;
  } catch (error) {
    console.error(`${provider.charAt(0).toUpperCase() + provider.slice(1)} Sign-in Error:`, error);
    return null;
  }
};

/** 🔹 Logout function */
export const logout = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("user");
  } catch (error) {
    console.error("Logout Error:", error);
  }
};
