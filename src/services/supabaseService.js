import { createClient } from '@supabase/supabase-js';
import { supabaseConfig } from '../config/supabaseConfig'; // Import Supabase config

const supabase = createClient(supabaseConfig.url, supabaseConfig.key);

// Fetch data from Supabase
export const fetchDataFromSupabase = async () => {
  const { data, error } = await supabase
    .from('your_table_name')
    .select('*');
  if (error) {
    console.error("Error fetching data from Supabase:", error);
    return [];
  }
  return data;
};

// Add data to Supabase
export const addDataToSupabase = async (data) => {
  const { data: insertedData, error } = await supabase
    .from('your_table_name')
    .insert([data]);
  if (error) {
    console.error("Error adding data to Supabase:", error);
    return null;
  }
  return insertedData;
};

// Update data in Supabase
export const updateDataInSupabase = async (id, newData) => {
  const { data: updatedData, error } = await supabase
    .from('your_table_name')
    .update(newData)
    .match({ id });
  if (error) {
    console.error("Error updating data in Supabase:", error);
    return null;
  }
  return updatedData;
};

// Delete data from Supabase
export const deleteDataFromSupabase = async (id) => {
  const { data, error } = await supabase
    .from('your_table_name')
    .delete()
    .match({ id });
  if (error) {
    console.error("Error deleting data from Supabase:", error);
    return null;
  }
  return data;
};
