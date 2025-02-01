import { getDBService } from "./dbFactory";
import { ProductService } from "./operations/ProductService";
import { OrderService } from "./operations/OrderService";
import { NotificationService } from "./operations/NotificationService";
import { BusinessService } from "./operations/BusinessService";
import { SalesService } from "./operations/SalesService";
import { ManagementService } from "./operations/ManagementService";
import { SettingService } from "./operations/SettingService";

const dbService = getDBService(); // Get the correct database provider

export const services = {
  product: new ProductService(dbService),        // Product CRUD operations
  order: new OrderService(dbService),            // Order CRUD operations
  notification: new NotificationService(dbService), // Notifications CRUD
  business: new BusinessService(dbService),      // Business CRUD operations
  sales: new SalesService(dbService),  
  managementService  :new ManagementService(dbService),        // Sales CRUD operations
  settingService:new SettingService(dbService)
};
