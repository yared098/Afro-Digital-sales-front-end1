import FirebaseProductService from './firebaseService';
import MySQLOrderService from './mysqlService';
import MongoDBNotificationService from './mongodbService';
import SupabaseSalesService from './supabaseService';
import { dbConfig } from '../config/dbConfig';

const productServiceFactory = () => {
  switch (dbConfig.provider) {
    case 'firebase':
      return new FirebaseProductService();
    case 'mysql':
      return new MySQLOrderService();
    case 'mongodb':
      return new MongoDBNotificationService();
    case 'supabase':
      return new SupabaseSalesService();
    default:
      throw new Error('Unsupported DB provider');
  }
};

export default productServiceFactory;
