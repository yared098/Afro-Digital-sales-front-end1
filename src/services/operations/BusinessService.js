import { BaseDBService } from "../BaseDBService";

export class BusinessService extends BaseDBService {
  constructor(dbService) {
    super(dbService);
    this.collection = "businesses";
  }

  async getAllBusinesses() {
    return this.read(this.collection);
  }

  async getBusinessById(id) {
    return this.read(this.collection, id);
  }

  async createBusiness(businessData) {
    return this.create(this.collection, businessData);
  }

  async updateBusiness(id, businessData) {
    return this.update(this.collection, id, businessData);
  }

  async deleteBusiness(id) {
    return this.delete(this.collection, id);
  }
}
