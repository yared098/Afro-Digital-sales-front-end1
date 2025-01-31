import { BaseDBService } from "../BaseDBService";

export class NotificationService extends BaseDBService {
  constructor(dbService) {
    super(dbService);
    this.collection = "notifications";
  }

  async getAllNotifications() {
    return this.read(this.collection);
  }

  async getNotificationById(id) {
    return this.read(this.collection, id);
  }

  async addNotification(notificationData) {
    return this.create(this.collection, notificationData);
  }

  async deleteNotification(id) {
    return this.delete(this.collection, id);
  }
}
