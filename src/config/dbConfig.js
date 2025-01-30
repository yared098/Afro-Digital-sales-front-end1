// src/config/dbConfig.js

export const dbConfig = {
    provider: import.meta.env.VITE_DB_PROVIDER|| "firebase", // Default to firebase if not set
  
    firebase: {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    },
    mysql: {
      host: import.meta.env.VITE_MYSQL_HOST,
      user: import.meta.env.VITE_MYSQL_USER,
      password: import.meta.env.VITE_MYSQL_PASSWORD,
      database: import.meta.env.VITE_MYSQL_DATABASE,
    },
    mongodb: {
      uri: import.meta.env.VITE_MONGODB_URI,
    },
    supabase: {
      url: import.meta.env.VITE_SUPABASE_URL,
      key: import.meta.env.VITE_SUPABASE_KEY,
    },
  };
  