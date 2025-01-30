import { dbConfig } from "../config/dbConfig";
import { 
  fetchDataFromFirebase, 
  addUserDataToFirebase, 
  updateDataInFirebase, 
  deleteDataFromFirebase ,
  getUserByIdFromFirebase
} from "./firebaseService";

/** Fetch user based on the selected provider */
export const fetchUserById = async (userId) => {
  switch (dbConfig.provider) {
    case "firebase":
      return await getUserByIdFromFirebase(userId); // Pass userId to getUserByIdFromFirebase
    default:
      throw new Error("Unsupported database provider");
  }
};
/** Add user to the selected provider */
export const saveUserToDatabase = async (userData) => {
  switch (dbConfig.provider) {
    case "firebase":
      return await addUserDataToFirebase("users", userData);
    default:
      throw new Error("Unsupported database provider");
  }
};


/** Fetch data based on the selected provider */
export const fetchData = async () => {
  switch (dbConfig.provider) {
    case "firebase":
      return await fetchDataFromFirebase();

    default:
      throw new Error("Unsupported database provider");
  }
};

/** Add data to the selected database */
export const addData = async (data) => {
  switch (dbConfig.provider) {
    case "firebase":
      return await addDataToFirebase(data);
    default:
      throw new Error("Unsupported database provider");
  }
};

/** Update data in the selected database */
export const updateData = async (id, newData) => {
  switch (dbConfig.provider) {
    case "firebase":
      return await updateDataInFirebase(id, newData);
    default:
      throw new Error("Unsupported database provider");
  }
};

/** Delete data from the selected database */
export const deleteData = async (id) => {
  switch (dbConfig.provider) {
    case "firebase":
      return await deleteDataFromFirebase(id);
    default:
      throw new Error("Unsupported database provider");
  }
};




/** Update user in the selected provider */
export const updateUser = async (userId, newData) => {
  switch (dbConfig.provider) {
    case "firebase":
      return await updateDataInFirebase("users", userId, newData);
    default:
      throw new Error("Unsupported database provider");
  }
};

/** Delete user from the selected provider */
export const deleteUser = async (userId) => {
  switch (dbConfig.provider) {
    case "firebase":
      return await deleteDataFromFirebase("users", userId);
  
    default:
      throw new Error("Unsupported database provider");
  }
};
