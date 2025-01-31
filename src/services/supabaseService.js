import { createClient } from '@supabase/supabase-js';
import { supabaseConfig } from '../config/supabaseConfig'; // Import Supabase config

// Initialize Supabase
const supabase = createClient(supabaseConfig.url, supabaseConfig.key);

// Function to fetch user data by ID from Supabase
export const getUserByIdFromSupabase = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('users') // Assuming 'users' is the table name
      .select('*')
      .eq('id', userId) // Fetch by ID
      .single(); // Use .single() to get a single row

    if (error) throw error;
    return data; // Return user data if found
  } catch (error) {
    console.error("Error fetching user by ID from Supabase:", error);
    return null;
  }
};

// Function to add user data to Supabase with a custom ID (e.g., using data.uid)
export const addUserDataToSupabase = async (data) => {
  try {
    const { data: result, error } = await supabase
      .from('users') // Assuming 'users' is the table name
      .upsert([{ id: data.uid, name: data.name, email: data.email, other_field: data.other_field }], { onConflict: ['id'] }); // Upsert based on ID

    if (error) throw error;
    return { id: data.uid, ...data }; // Return the data with custom ID
  } catch (error) {
    console.error("Error adding user data to Supabase:", error);
    return null;
  }
};

// Function to fetch data from Supabase (accepts table name)
export const fetchDataFromSupabase = async (tableName) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*'); // Fetch all rows from the given table

    if (error) throw error;
    return data; // Return the fetched data
  } catch (error) {
    console.error("Error fetching data from Supabase:", error);
    return [];
  }
};

// Function to update data in Supabase (accepts table name)
export const updateDataInSupabase = async (tableName, id, newData) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .update(newData) // Update data
      .eq('id', id); // Match by ID

    if (error) throw error;
    return true; // Return true on success
  } catch (error) {
    console.error("Error updating data in Supabase:", error);
    return false;
  }
};

// Function to delete data from Supabase (accepts table name)
export const deleteDataFromSupabase = async (tableName, id) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .delete() // Delete data
      .eq('id', id); // Match by ID

    if (error) throw error;
    return true; // Return true on success
  } catch (error) {
    console.error("Error deleting data from Supabase:", error);
    return false;
  }
};

export class SupabaseDBService {
  async read(table, id = null) {
    const { data, error } = id
      ? await supabase.from(table).select("*").eq("id", id).single()
      : await supabase.from(table).select("*");
    if (error) throw error;
    return data;
  }

  async create(table, data) {
    const { data: insertedData, error } = await supabase.from(table).insert([data]);
    if (error) throw error;
    return insertedData;
  }

  async update(table, id, newData) {
    const { data, error } = await supabase.from(table).update(newData).eq("id", id);
    if (error) throw error;
    return data;
  }

  async delete(table, id) {
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) throw error;
  }
}

export { supabase };
