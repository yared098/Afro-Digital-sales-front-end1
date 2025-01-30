export const authConfig = {
    provider: import.meta.env.VITE_AUTH_PROVIDER || "firebase",
    firebase: {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    },
    googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    facebookAppId: import.meta.env.VITE_FACEBOOK_APP_ID,
    instagramClientId: import.meta.env.VITE_INSTAGRAM_CLIENT_ID,
  };
  