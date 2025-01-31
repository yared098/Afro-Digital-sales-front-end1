import { BaseDBService } from "../BaseDBService";

export class ProductService extends BaseDBService {
  constructor(dbService) {
    super(dbService);
    this.collection = "products"; // Collection/Table name
  }

  async getAllProducts() {
    return this.read(this.collection);
  }

  async getProductById(id) {
    return this.read(this.collection, id);
  }

  async addProduct(productData) {
    return this.create(this.collection, productData);
  }

  async updateProduct(id, productData) {
    return this.update(this.collection, id, productData);
  }

  async deleteProduct(id) {
    return this.delete(this.collection, id);
  }
}
