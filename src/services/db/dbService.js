// src/services/db/dbService.js
import { dbConfig } from '../config/dbConfig';
import firebase from 'firebase/app';
import 'firebase/firestore';
import mysql from 'mysql';
import { createClient } from '@supabase/supabase-js';
import mongoose from 'mongoose';

export const initializeDB = () => {
  if (dbConfig.provider === 'firebase') {
    firebase.initializeApp(dbConfig.firebaseConfig);
    return firebase.firestore();
  }
  if (dbConfig.provider === 'mysql') {
    const connection = mysql.createConnection(dbConfig.mysqlConfig);
    return connection;
  }
  if (dbConfig.provider === 'mongodb') {
    mongoose.connect(dbConfig.mongodbConfig.uri);
    return mongoose.connection;
  }
  if (dbConfig.provider === 'supabase') {
    const supabase = createClient(dbConfig.supabaseConfig.url, dbConfig.supabaseConfig.key);
    return supabase;
  }
  // Handle other DB sources as needed
};

export const createDocument = async (data) => {
  const db = initializeDB();
  if (dbConfig.provider === 'firebase') {
    const docRef = await db.collection('documents').add(data);
    return docRef;
  }
  if (dbConfig.provider === 'mysql') {
    // Insert data into MySQL
  }
  if (dbConfig.provider === 'mongodb') {
    // Insert data into MongoDB
  }
  if (dbConfig.provider === 'supabase') {
    // Insert data into Supabase
  }
};
