// src/services/auth/authService.js
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword, signOut as firebaseSignOut, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { authConfig } from '../../config/authConfig';

// Initialize Firebase
export const initializeAuth = () => {
  if (authConfig.provider === 'firebase') {
    const firebaseApp = initializeApp(authConfig.firebaseConfig);
    return getAuth(firebaseApp);
  }
};

// Sign up with email and password
export const signUpWithEmailAndPassword = async (email, password) => {
  const auth = initializeAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

// Sign in with email and password (renamed function to avoid conflict)
export const signInWithEmailAndPasswordCustom = async (email, password) => {
  const auth = initializeAuth();
  try {
    const userCredential = await firebaseSignInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

// Sign out
export const signOut = async () => {
  const auth = initializeAuth();
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
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
    case 'instagram':
      // Handle Instagram OAuth logic here
      break;
    default:
      throw new Error('Unknown provider');
  }

  try {
    const result = await signInWithPopup(auth, authProvider);
    return result.user;
  } catch (error) {
    console.error('Error signing in with provider:', error);
    throw error;
  }
};
