import axios from "axios";

export class APIDBService {
  async read(resource, id = null) {
    const url = id ? `${import.meta.env.VITE_API_URL}/${resource}/${id}` : `${import.meta.env.VITE_API_URL}/${resource}`;
    const response = await axios.get(url);
    return response.data;
  }

  async create(resource, data) {
    const url = `${import.meta.env.VITE_API_URL}/${resource}`;
    const response = await axios.post(url, data);
    return response.data;
  }

  async update(resource, id, newData) {
    const url = `${import.meta.env.VITE_API_URL}/${resource}/${id}`;
    const response = await axios.put(url, newData);
    return response.data;
  }

  async delete(resource, id) {
    const url = `${import.meta.env.VITE_API_URL}/${resource}/${id}`;
    const response = await axios.delete(url);
    return response.data;
  }
}
