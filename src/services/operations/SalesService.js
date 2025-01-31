import { BaseDBService } from "../BaseDBService";

export class SalesService extends BaseDBService {
  constructor(dbService) {
    super(dbService);
    this.collection = "sales";
  }

  async getAllSales() {
    return this.read(this.collection);
  }

  async getSaleById(id) {
    return this.read(this.collection, id);
  }

  async createSale(saleData) {
    return this.create(this.collection, saleData);
  }

  async updateSale(id, saleData) {
    return this.update(this.collection, id, saleData);
  }

  async deleteSale(id) {
    return this.delete(this.collection, id);
  }
}
