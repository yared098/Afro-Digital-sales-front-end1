// // src/config/authConfig.js
// export const authConfig = {
//     provider: process.env.VITE_AUTH_PROVIDER || 'firebase',  // Default to firebase
//     firebaseConfig: {
//       apiKey: process.env.VITE_FIREBASE_API_KEY,
//       authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
//       projectId: process.env.VITE_FIREBASE_PROJECT_ID,
//       storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
//       messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//       appId: process.env.VITE_FIREBASE_APP_ID,
//     },
//     googleConfig: {
//       clientId: process.env.VITE_GOOGLE_CLIENT_ID,
//     },
//     facebookConfig: {
//       appId: process.env.VITE_FACEBOOK_APP_ID,
//     },
//     instagramConfig: {
//       clientId: process.env.VITE_INSTAGRAM_CLIENT_ID,
//     },
//   };
  

export const authConfig = {
    provider: import.meta.env.VITE_AUTH_PROVIDER || 'firebase',  // Default to firebase
    firebaseConfig: {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    },
    googleConfig: {
      clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    },
    facebookConfig: {
      appId: import.meta.env.VITE_FACEBOOK_APP_ID,
    },
    instagramConfig: {
      clientId: import.meta.env.VITE_INSTAGRAM_CLIENT_ID,
    },
  };
  