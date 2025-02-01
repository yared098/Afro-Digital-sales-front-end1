import { BaseDBService } from "../BaseDBService";

export class ManagementService extends BaseDBService {
  constructor(dbService) {
    super(dbService);
    this.collection = "managements"; // Assuming you're working with a "managements" collection
  }

  // Get all management data
  async getAllManagements() {
    return this.read(this.collection);
  }

  // Get management data by ID
  async getManagementById(id) {
    return this.read(this.collection, id);
  }

  // Create new management entry
  async createManagement(managementData) {
    return this.create(this.collection, managementData);
  }

  // Update management entry by ID
  async updateManagement(id, managementData) {
    return this.update(this.collection, id, managementData);
  }

  // Delete management entry by ID
  async deleteManagement(id) {
    return this.delete(this.collection, id);
  }
}
