// src/config/authConfig.js
export const authConfig = {
    provider: process.env.AUTH_PROVIDER || 'firebase',  // Default to firebase
    firebaseConfig: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    },
    googleConfig: {
      clientId: process.env.GOOGLE_CLIENT_ID,
    },
    facebookConfig: {
      appId: process.env.FACEBOOK_APP_ID,
    },
    instagramConfig: {
      clientId: process.env.INSTAGRAM_CLIENT_ID,
    },
  };
  