// apiService.js (Frontend)
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Update with your backend URL

// Fetch Data
export const fetchDataFromMongoDB = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/data`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

// Add Data
export const addDataToMongoDB = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/data`, data);
    return response.data;
  } catch (error) {
    console.error("Error adding data:", error);
    return null;
  }
};

// Update Data
export const updateDataInMongoDB = async (id, newData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/data/${id}`, newData);
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    return null;
  }
};

// Delete Data
export const deleteDataFromMongoDB = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/data/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    return null;
  }
};
