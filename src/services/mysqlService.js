// import mysql from 'mysql2';
// // import mysql from "mysql2/promise";
// // const mysql = require("mysql2/promise");

// import { mysqlConfig } from '../config/mysqlConfig'; // Import MySQL config

// // Create MySQL connection
// const connection = mysql.createConnection(mysqlConfig);


// // Function to fetch user data by ID from MySQL
// export const getUserByIdFromMySQL = async (userId) => {
//   return new Promise((resolve, reject) => {
//     connection.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
//       if (err) {
//         reject(new Error(`Error fetching user by ID from MySQL: ${err.message}`));
//       } else {
//         if (results.length > 0) {
//           resolve(results[0]); // Return the user data if found
//         } else {
//           resolve(null); // If user not found
//         }
//       }
//     });
//   });
// };

// // Function to add user data to MySQL with a custom ID (e.g., using data.uid)
// export const addUserDataToMySQL = async (data) => {
//   return new Promise((resolve, reject) => {
//     // Insert user data with custom ID (using data.uid as ID)
//     const query = 'INSERT INTO users (id, name, email, other_field) VALUES (?, ?, ?, ?)'; // Add fields as per your table structure
//     const values = [data.uid, data.name, data.email, data.other_field]; // Assuming 'data' has these fields

//     connection.query(query, values, (err, results) => {
//       if (err) {
//         reject(new Error(`Error adding user data to MySQL: ${err.message}`));
//       } else {
//         resolve({ id: data.uid, ...data });
//       }
//     });
//   });
// };

// // Other functions like updateData and deleteData can be written in a similar manner...


// // Function to fetch data from MySQL
// export const fetchDataFromMySQL = async () => {
//   try {
//     return new Promise((resolve, reject) => {
//       connection.query('SELECT * FROM your_table_name', (err, results) => {
//         if (err) {
//           reject(new Error(`Error fetching data from MySQL: ${err.message}`));
//         } else {
//           resolve(results);
//         }
//       });
//     });
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// // Function to add data to MySQL
// export const addDataToMySQL = async (data) => {
//   try {
//     return new Promise((resolve, reject) => {
//       connection.query('INSERT INTO your_table_name SET ?', data, (err, results) => {
//         if (err) {
//           reject(new Error(`Error adding data to MySQL: ${err.message}`));
//         } else {
//           resolve(results);
//         }
//       });
//     });
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// // Function to update data in MySQL
// export const updateDataInMySQL = async (id, newData) => {
//   try {
//     return new Promise((resolve, reject) => {
//       connection.query('UPDATE your_table_name SET ? WHERE id = ?', [newData, id], (err, results) => {
//         if (err) {
//           reject(new Error(`Error updating data in MySQL: ${err.message}`));
//         } else {
//           resolve(results);
//         }
//       });
//     });
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// // Function to delete data from MySQL
// export const deleteDataFromMySQL = async (id) => {
//   try {
//     return new Promise((resolve, reject) => {
//       connection.query('DELETE FROM your_table_name WHERE id = ?', [id], (err, results) => {
//         if (err) {
//           reject(new Error(`Error deleting data from MySQL: ${err.message}`));
//         } else {
//           resolve(results);
//         }
//       });
//     });
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };


// // add new crude 
// export class MySQLDBService {
//   constructor() {
//     this.pool = mysql.createPool({
//       host: mysqlConfig.host,
//       user: mysqlConfig.user,
//       password: mysqlConfig.password,
//       database: mysqlConfig.database,
//       waitForConnections: true,
//       connectionLimit: mysqlConfig.connectionLimit || 10,
//       queueLimit: mysqlConfig.queueLimit || 0,
//     });
//   }

//   async read(table, id = null, limit = null, offset = 0) {
//     const connection = await this.pool.getConnection();
//     try {
//       let sql = `SELECT * FROM ??`;
//       let params = [table];

//       if (id) {
//         sql += ` WHERE id = ?`;
//         params.push(id);
//       }

//       if (limit !== null) {
//         sql += ` LIMIT ? OFFSET ?`;
//         params.push(limit, offset);
//       }

//       const [rows] = await connection.execute(sql, params);
//       return id ? (rows.length ? rows[0] : null) : rows;
//     } catch (error) {
//       console.error("MySQL Read Error:", error);
//       throw new Error("Database read operation failed.");
//     } finally {
//       connection.release();
//     }
//   }

//   async create(table, data) {
//     const connection = await this.pool.getConnection();
//     try {
//       const columns = Object.keys(data).join(", ");
//       const values = Object.values(data);
//       const placeholders = values.map(() => "?").join(", ");
//       const sql = `INSERT INTO ?? (${columns}) VALUES (${placeholders})`;

//       const [result] = await connection.execute(sql, [table, ...values]);
//       return result.insertId;
//     } catch (error) {
//       console.error("MySQL Create Error:", error);
//       throw new Error("Database insert operation failed.");
//     } finally {
//       connection.release();
//     }
//   }

//   async bulkInsert(table, records) {
//     const connection = await this.pool.getConnection();
//     try {
//       if (!records.length) throw new Error("No records provided for bulk insert.");

//       const columns = Object.keys(records[0]).join(", ");
//       const values = records.map((rec) => Object.values(rec));
//       const placeholders = `(${new Array(Object.keys(records[0]).length).fill("?").join(", ")})`;
//       const sql = `INSERT INTO ?? (${columns}) VALUES ${values.map(() => placeholders).join(", ")}`;

//       const [result] = await connection.query(sql, [table, ...values.flat()]);
//       return result.affectedRows;
//     } catch (error) {
//       console.error("MySQL Bulk Insert Error:", error);
//       throw new Error("Database bulk insert failed.");
//     } finally {
//       connection.release();
//     }
//   }

//   async update(table, id, newData) {
//     const connection = await this.pool.getConnection();
//     try {
//       const updates = Object.keys(newData).map((key) => `${key} = ?`).join(", ");
//       const values = Object.values(newData);
//       const sql = `UPDATE ?? SET ${updates} WHERE id = ?`;

//       const [result] = await connection.execute(sql, [table, ...values, id]);
//       return result.affectedRows > 0 ? { success: true } : { success: false };
//     } catch (error) {
//       console.error("MySQL Update Error:", error);
//       throw new Error("Database update operation failed.");
//     } finally {
//       connection.release();
//     }
//   }

//   async delete(table, id, softDelete = false) {
//     const connection = await this.pool.getConnection();
//     try {
//       if (softDelete) {
//         // If soft delete enabled, update a `deleted_at` column instead of hard delete
//         const sql = `UPDATE ?? SET deleted_at = NOW() WHERE id = ?`;
//         await connection.execute(sql, [table, id]);
//       } else {
//         const sql = `DELETE FROM ?? WHERE id = ?`;
//         await connection.execute(sql, [table, id]);
//       }
//       return { success: true };
//     } catch (error) {
//       console.error("MySQL Delete Error:", error);
//       throw new Error("Database delete operation failed.");
//     } finally {
//       connection.release();
//     }
//   }
// }