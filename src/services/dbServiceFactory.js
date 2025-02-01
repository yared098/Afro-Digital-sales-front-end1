import { dbConfig } from '../config/dbConfig';
import FirebaseService from './firebaseService';
import MySQLService from './mysqlService';
import SupabaseService from './supabaseService';

const dbServiceFactory = () => {
  switch (dbConfig.provider) {
    case 'firebase':
      return new FirebaseService();
    case 'mysql':
      return new MySQLService();
    case 'supabase':
      return new SupabaseService();
    default:
      throw new Error('Unsupported DB provider');
  }
};

export default dbServiceFactory;
