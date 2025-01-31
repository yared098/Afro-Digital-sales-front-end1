import { BaseDBService } from "../BaseDBService";

export class OrderService extends BaseDBService {
  constructor(dbService) {
    super(dbService);
    this.collection = "orders";
  }

  async getAllOrders() {
    return this.read(this.collection);
  }

  async getOrderById(id) {
    return this.read(this.collection, id);
  }

  async createOrder(orderData) {
    return this.create(this.collection, orderData);
  }

  async updateOrder(id, orderData) {
    return this.update(this.collection, id, orderData);
  }

  async deleteOrder(id) {
    return this.delete(this.collection, id);
  }
}
