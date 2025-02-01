import { BaseDBService } from "../BaseDBService";

export class SettingService extends BaseDBService {
  constructor(dbService) {
    super(dbService);
    this.collection = "settings";
  }

  // Get all settings
  async getAllSettings() {
    return this.read(this.collection);
  }

  // Get setting by ID
  async getSettingById(id) {
    return this.read(this.collection, id);
  }

  // Create new setting
  async createSetting(settingData) {
    return this.create(this.collection, settingData);
  }

  // Update setting by ID
  async updateSetting(id, settingData) {
    return this.update(this.collection, id, settingData);
  }

  // Delete setting by ID
  async deleteSetting(id) {
    return this.delete(this.collection, id);
  }
}
