import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc,setDoc, updateDoc, deleteDoc, doc, getDoc } from "firebase/firestore";
import { firebaseConfig } from "../config/firebaseConfig"; // Import Firebase config

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to fetch user data by ID from Firestore
export const getUserByIdFromFirebase = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId)); // Fetch user document by ID
    if (userDoc.exists()) {

      return { id: userDoc.uid, ...userDoc.data() }; // Return user data if document exists
    } else {
      console.error("User not found in Firebase");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user by ID from Firebase:", error);
    return null;
  }
};

// Function to add data to Firestore with a custom ID (e.g., using data.uid)
export const addUserDataToFirebase = async (collectionName, data) => {
  try {
    // Use doc() to specify a custom ID (e.g., data.uid)
    const docRef = doc(db, 'users', data.uid); 
    await setDoc(docRef, data); // Use setDoc() to add data with the custom ID

    return { id: docRef.id, ...data };
  } catch (error) {
    console.error("Error adding data to Firebase:", error);
    return null;
  }
};



// Function to fetch data from Firestore (accepts collection name)
export const fetchDataFromFirebase = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return data;
  } catch (error) {
    console.error("Error fetching data from Firebase:", error);
    return [];
  }
};

// Function to add data to Firestore (accepts collection name)
export const addDataToFirebase = async (collectionName, data, customId = null) => {
  try {
    // If a custom ID is provided, use it; otherwise, Firestore will generate an ID
    const docRef = customId ? doc(db, collectionName, customId) : doc(collection(db, collectionName));
    await setDoc(docRef, data); // Write the data to Firestore

    return { id: docRef.id, ...data };
  } catch (error) {
    console.error("Error adding data to Firebase:", error);
    return null;
  }
};


// Function to update data in Firestore (accepts collection name)
export const updateDataInFirebase = async (collectionName, id, newData) => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, newData);
    return true;
  } catch (error) {
    console.error("Error updating data in Firebase:", error);
    return false;
  }
};

// Function to delete data from Firestore (accepts collection name)
export const deleteDataFromFirebase = async (collectionName, id) => {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error deleting data from Firebase:", error);
    return false;
  }
};

export { auth, db };
