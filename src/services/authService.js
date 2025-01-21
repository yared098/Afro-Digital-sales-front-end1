// src/services/auth/authService.js
import { authConfig } from '../config/authConfig';
import firebase from 'firebase/app';
import 'firebase/auth';

export const initializeAuth = () => {
  if (authConfig.provider === 'firebase') {
    // Initialize Firebase Authentication
    firebase.initializeApp(authConfig.firebaseConfig);
  }
  // Add additional logic for other providers (Google, Facebook, Instagram) here
};

export const signInWithProvider = async (provider) => {
  if (authConfig.provider === 'firebase') {
    let authProvider;
    switch (provider) {
      case 'google':
        authProvider = new firebase.auth.GoogleAuthProvider();
        break;
      case 'facebook':
        authProvider = new firebase.auth.FacebookAuthProvider();
        break;
      case 'instagram':
        // Use Instagram OAuth logic here
        break;
      default:
        throw new Error('Unknown provider');
    }

    try {
      const result = await firebase.auth().signInWithPopup(authProvider);
      return result.user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  // Handle other providers (Google, Facebook, etc.)
};
