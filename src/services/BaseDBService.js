export class BaseDBService {
    constructor(dbService) {
      this.dbService = dbService;
    }
  
    async read(table, id = null) {
      return this.dbService.read(table, id);
    }
  
    async create(table, data) {
      return this.dbService.create(table, data);
    }
  
    async update(table, id, newData) {
      return this.dbService.update(table, id, newData);
    }
  
    async delete(table, id) {
      return this.dbService.delete(table, id);
    }
  }
  