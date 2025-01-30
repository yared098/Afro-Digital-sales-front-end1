import mysql from 'mysql2';
import { mysqlConfig } from '../config/mysqlConfig'; // Import MySQL config

// Create MySQL connection
const connection = mysql.createConnection(mysqlConfig);


// Function to fetch user data by ID from MySQL
export const getUserByIdFromMySQL = async (userId) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
      if (err) {
        reject(new Error(`Error fetching user by ID from MySQL: ${err.message}`));
      } else {
        if (results.length > 0) {
          resolve(results[0]); // Return the user data if found
        } else {
          resolve(null); // If user not found
        }
      }
    });
  });
};

// Function to add user data to MySQL with a custom ID (e.g., using data.uid)
export const addUserDataToMySQL = async (data) => {
  return new Promise((resolve, reject) => {
    // Insert user data with custom ID (using data.uid as ID)
    const query = 'INSERT INTO users (id, name, email, other_field) VALUES (?, ?, ?, ?)'; // Add fields as per your table structure
    const values = [data.uid, data.name, data.email, data.other_field]; // Assuming 'data' has these fields

    connection.query(query, values, (err, results) => {
      if (err) {
        reject(new Error(`Error adding user data to MySQL: ${err.message}`));
      } else {
        resolve({ id: data.uid, ...data });
      }
    });
  });
};

// Other functions like updateData and deleteData can be written in a similar manner...


// Function to fetch data from MySQL
export const fetchDataFromMySQL = async () => {
  try {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM your_table_name', (err, results) => {
        if (err) {
          reject(new Error(`Error fetching data from MySQL: ${err.message}`));
        } else {
          resolve(results);
        }
      });
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Function to add data to MySQL
export const addDataToMySQL = async (data) => {
  try {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO your_table_name SET ?', data, (err, results) => {
        if (err) {
          reject(new Error(`Error adding data to MySQL: ${err.message}`));
        } else {
          resolve(results);
        }
      });
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Function to update data in MySQL
export const updateDataInMySQL = async (id, newData) => {
  try {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE your_table_name SET ? WHERE id = ?', [newData, id], (err, results) => {
        if (err) {
          reject(new Error(`Error updating data in MySQL: ${err.message}`));
        } else {
          resolve(results);
        }
      });
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Function to delete data from MySQL
export const deleteDataFromMySQL = async (id) => {
  try {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM your_table_name WHERE id = ?', [id], (err, results) => {
        if (err) {
          reject(new Error(`Error deleting data from MySQL: ${err.message}`));
        } else {
          resolve(results);
        }
      });
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
