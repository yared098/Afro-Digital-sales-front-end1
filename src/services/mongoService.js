// import mongoose from "mongoose";
// import { dbConfig } from "../config/dbConfig"; // Import MongoDB Config

// // Connect to MongoDB using Mongoose (Mongoose 6+)
// mongoose.connect(dbConfig.mongodb.uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("Connected to MongoDB"))
// .catch((error) => console.error("MongoDB connection error:", error));

// // Define a Schema for MongoDB Collection
// const DataSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   age: { type: Number, required: true },
// });

// // Create a Model
// const DataModel = mongoose.model("Data", DataSchema);

// // 🔹 Fetch Data from MongoDB
// export const fetchDataFromMongoDB = async () => {
//   try {
//     return await DataModel.find();
//   } catch (error) {
//     console.error("Error fetching data from MongoDB:", error);
//     return [];
//   }
// };

// // 🔹 Add Data to MongoDB
// export const addDataToMongoDB = async (data) => {
//   try {
//     const newData = new DataModel(data);
//     return await newData.save();
//   } catch (error) {
//     console.error("Error adding data to MongoDB:", error);
//     return null;
//   }
// };

// // 🔹 Update Data in MongoDB
// export const updateDataInMongoDB = async (id, newData) => {
//   try {
//     return await DataModel.findByIdAndUpdate(id, newData, { new: true });
//   } catch (error) {
//     console.error("Error updating data in MongoDB:", error);
//     return null;
//   }
// };

// // 🔹 Delete Data from MongoDB
// export const deleteDataFromMongoDB = async (id) => {
//   try {
//     return await DataModel.findByIdAndDelete(id);
//   } catch (error) {
//     console.error("Error deleting data from MongoDB:", error);
//     return null;
//   }
// };