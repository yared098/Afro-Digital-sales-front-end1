import mysql from 'mysql2';
import { mysqlConfig } from '../config/mysqlConfig'; // Import MySQL config

const connection = mysql.createConnection(mysqlConfig);

// Fetch data from MySQL
export const fetchDataFromMySQL = async () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM your_table_name', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// Add data to MySQL
export const addDataToMySQL = async (data) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO your_table_name SET ?', data, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// Update data in MySQL
export const updateDataInMySQL = async (id, newData) => {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE your_table_name SET ? WHERE id = ?', [newData, id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// Delete data from MySQL
export const deleteDataFromMySQL = async (id) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM your_table_name WHERE id = ?', [id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
