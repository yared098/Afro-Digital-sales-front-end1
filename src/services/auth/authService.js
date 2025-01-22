import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import axios from 'axios';
import { authConfig } from '../../config/authConfig';

// Singleton for Firebase Initialization
let firebaseApp;
let auth;

export const initializeAuth = () => {
  if (!firebaseApp) {
    if (authConfig.provider === 'firebase') {
      firebaseApp = initializeApp(authConfig.firebaseConfig);
      auth = getAuth(firebaseApp);
    } else {
      throw new Error('Unsupported auth provider');
    }
  }
  return auth;
};

// Save user info to localStorage
const saveUserToLocalStorage = (userInfo) => {
  try {
    localStorage.setItem('user', JSON.stringify(userInfo));
    console.log('User saved to localStorage:', userInfo);
  } catch (error) {
    console.error('Error saving user to localStorage:', error.message);
  }
};

// Save user info to your database
const saveUserToDatabase = async (userInfo) => {
  try {
    const response = await axios.post('https://your-backend-api.com/users', userInfo);
    console.log('User saved to database successfully:', response.data);
  } catch (error) {
    console.error('Error saving user to database:', error.message);
    throw error;
  }
};

// Sign up with email and password
export const signUpWithEmailAndPassword = async (email, password) => {
  const auth = initializeAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userInfo = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName || 'Anonymous',
    };

    // Save user to localStorage and database
    saveUserToLocalStorage(userInfo);
    await saveUserToDatabase(userInfo);

    return userCredential.user;
  } catch (error) {
    console.error('Error signing up:', error.message);
    throw error;
  }
};

// Sign in with email and password
export const signInWithEmailAndPasswordCustom = async (email, password) => {
  const auth = initializeAuth();
  try {
    const userCredential = await firebaseSignInWithEmailAndPassword(auth, email, password);
    const userInfo = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName || 'Anonymous',
    };

    // Save user to localStorage
    saveUserToLocalStorage(userInfo);

    return userCredential.user;
  } catch (error) {
    console.error('Error signing in:', error.message);
    throw error;
  }
};

// Sign in with external provider (Google, Facebook, etc.)
export const signInWithProvider = async (provider) => {
  const auth = initializeAuth();
  let authProvider;

  switch (provider) {
    case 'google':
      authProvider = new GoogleAuthProvider();
      break;
    case 'facebook':
      authProvider = new FacebookAuthProvider();
      break;
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }

  try {
    const result = await signInWithPopup(auth, authProvider);

    const user = result.user;
    const userInfo = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || 'Anonymous',
      photoURL: user.photoURL,
      provider,
    };

    // Save user to localStorage and database
    saveUserToLocalStorage(userInfo);
    // await saveUserToDatabase(userInfo);

    return user;
  } catch (error) {
    console.error(`Error signing in with ${provider}:`, error.message);
    throw error;
  }
};

// Sign out
export const signOut = async () => {
  const auth = initializeAuth();
  try {
    await firebaseSignOut(auth);
    localStorage.removeItem('user'); // Remove user info from localStorage
    console.log('Successfully signed out and cleared localStorage');
  } catch (error) {
    console.error('Error signing out:', error.message);
    throw error;
  }
};
