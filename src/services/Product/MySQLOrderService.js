import mysql from 'mysql2/promise';
import { OrderOperations } from '../operations/OrderOperations';
import { dbConfig } from '../../config/dbConfig';

class MySQLOrderService extends OrderOperations {
  constructor() {
    super();
    this.pool = mysql.createPool(dbConfig.mysql);
  }

  async create(data) {
    const [rows] = await this.pool.execute('INSERT INTO orders (product_id, quantity, status) VALUES (?, ?, ?)', [data.product_id, data.quantity, data.status]);
    return rows.insertId;
  }

  async read(id) {
    const [rows] = await this.pool.execute('SELECT * FROM orders WHERE id = ?', [id]);
    return rows[0] || null;
  }

  async update(id, data) {
    await this.pool.execute('UPDATE orders SET product_id = ?, quantity = ?, status = ? WHERE id = ?', [data.product_id, data.quantity, data.status, id]);
  }

  async delete(id) {
    await this.pool.execute('DELETE FROM orders WHERE id = ?', [id]);
  }
}

export default MySQLOrderService;
