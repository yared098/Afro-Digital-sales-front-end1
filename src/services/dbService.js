import { dbConfig } from "../config/dbConfig";
import { 
  fetchDataFromFirebase, 
  addUserDataToFirebase, 
  updateDataInFirebase, 
  deleteDataFromFirebase ,
  getUserByIdFromFirebase
} from "./firebaseService";
import { 
  fetchDataFromMongoDB, 
  addDataToMongoDB, 
  updateDataInMongoDB, 
  deleteDataFromMongoDB 
} from "./mongoService";
// import { 
//   fetchDataFromMySQL, 
//   addDataToMySQL, 
//   updateDataInMySQL, 
//   deleteDataFromMySQL 
// } from "./mysqlService";
import { 
  fetchDataFromSupabase, 
  addDataToSupabase, 
  updateDataInSupabase, 
  deleteDataFromSupabase 
} from "./supabaseService";

/** Fetch data based on the selected provider */
export const fetchData = async () => {
  switch (dbConfig.provider) {
    case "firebase":
      return await fetchDataFromFirebase();
    case "mongodb":
      return await fetchDataFromMongoDB();
    // case "mysql":
    //   return await fetchDataFromMySQL();
    case "supabase":
      return await fetchDataFromSupabase();
    default:
      throw new Error("Unsupported database provider");
  }
};

/** Add data to the selected database */
export const addData = async (data) => {
  switch (dbConfig.provider) {
    case "firebase":
      return await addDataToFirebase(data);
    case "mongodb":
      return await addDataToMongoDB(data);
    // case "mysql":
    //   return await addDataToMySQL(data);
    case "supabase":
      return await addDataToSupabase(data);
    default:
      throw new Error("Unsupported database provider");
  }
};

/** Update data in the selected database */
export const updateData = async (id, newData) => {
  switch (dbConfig.provider) {
    case "firebase":
      return await updateDataInFirebase(id, newData);
    case "mongodb":
      return await updateDataInMongoDB(id, newData);
    // case "mysql":
    //   return await updateDataInMySQL(id, newData);
    case "supabase":
      return await updateDataInSupabase(id, newData);
    default:
      throw new Error("Unsupported database provider");
  }
};

/** Delete data from the selected database */
export const deleteData = async (id) => {
  switch (dbConfig.provider) {
    case "firebase":
      return await deleteDataFromFirebase(id);
    case "mongodb":
      return await deleteDataFromMongoDB(id);
    // case "mysql":
    //   return await deleteDataFromMySQL(id);
    case "supabase":
      return await deleteDataFromSupabase(id);
    default:
      throw new Error("Unsupported database provider");
  }
};

/** Fetch user based on the selected provider */
export const fetchUserById = async (userId) => {
  switch (dbConfig.provider) {
    case "firebase":
      return await getUserByIdFromFirebase(userId); // Pass userId to getUserByIdFromFirebase
     
    // case "mongodb":
    //   return await fetchDataFromMongoDB("users");
    // case "mysql":
    //   return await fetchDataFromMySQL("users");
    case "supabase":
      return await fetchDataFromSupabase("users");
    default:
      throw new Error("Unsupported database provider");
  }
};

/** Add user to the selected provider */
export const saveUserToDatabase = async (userData) => {
  switch (dbConfig.provider) {
    case "firebase":
      return await addUserDataToFirebase("users", userData);
    case "mongodb":
      return await addDataToMongoDB("users", userData);
    // case "mysql":
    //   return await addDataToMySQL("users", userData);
    case "supabase":
      return await addDataToSupabase("users", userData);
    default:
      throw new Error("Unsupported database provider");
  }
};

/** Update user in the selected provider */
export const updateUser = async (userId, newData) => {
  switch (dbConfig.provider) {
    case "firebase":
      return await updateDataInFirebase("users", userId, newData);
    // case "mongodb":
    //   return await updateDataInMongoDB("users", userId, newData);
    // case "mysql":
    //   return await updateDataInMySQL("users", userId, newData);
    case "supabase":
      return await updateDataInSupabase("users", userId, newData);
    default:
      throw new Error("Unsupported database provider");
  }
};

/** Delete user from the selected provider */
export const deleteUser = async (userId) => {
  switch (dbConfig.provider) {
    case "firebase":
      return await deleteDataFromFirebase("users", userId);
    // case "mongodb":
    //   return await deleteDataFromMongoDB("users", userId);
    // case "mysql":
    //   return await deleteDataFromMySQL("users", userId);
    case "supabase":
      return await deleteDataFromSupabase("users", userId);
    default:
      throw new Error("Unsupported database provider");
  }
};
