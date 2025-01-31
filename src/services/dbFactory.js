import { FirebaseDBService } from "../services/firebaseService";
// import { MySQLDBService } from "../services/mysqlService";
import { SupabaseDBService } from "../services/supabaseService";
import { APIDBService } from "../services/apiService";

export const getDBService = () => {
  const provider = import.meta.env.VITE_DB_PROVIDER; // Get database provider from .env

  switch (provider) {
    case "firebase":
      return new FirebaseDBService();
    // case "mysql":
    //   return new MySQLDBService();
    case "supabase":
      return new SupabaseDBService();
    case "api":
      return new APIDBService();
    default:
      throw new Error(`Unsupported database provider: ${provider}`);
  }
};
