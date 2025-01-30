import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from "firebase/firestore";
import { firebaseConfig } from "../config/firebaseConfig"; // Import Firebase config

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to fetch data from Firestore
export const fetchDataFromFirebase = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return data;
  } catch (error) {
    console.error("Error fetching data from Firebase:", error);
    return [];
  }
};

// Function to fetch user data by ID from Firestore
export const getUserByIdFromFirebase = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId)); // Fetch user document by ID
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() }; // Return user data if document exists
    } else {
      console.error("User not found in Firebase");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user by ID from Firebase:", error);
    return null;
  }
};

// Function to add data to Firestore
export const addUserDataToFirebase = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return { id: docRef.id, ...data };
  } catch (error) {
    console.error("Error adding data to Firebase:", error);
    return null;
  }
};

// Function to update data in Firestore
export const updateDataInFirebase = async (id, newData) => {
  try {
    const docRef = doc(db, "users", id);
    await updateDoc(docRef, newData);
    return true;
  } catch (error) {
    console.error("Error updating data in Firebase:", error);
    return false;
  }
};

// Function to delete data from Firestore
export const deleteDataFromFirebase = async (id) => {
  try {
    const docRef = doc(db, "users", id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error deleting data from Firebase:", error);
    return false;
  }
};

export { auth, db };
