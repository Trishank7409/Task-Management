// import mongoose from "mongoose";

// export const initDB = async (): Promise<boolean> => {
//   return await new Promise((resolve, reject) => {
//     const mongodbUri = process.env.MONGODB_URI ?? "";

//     if (mongodbUri === "") throw new Error("mongod db uri not found!");
//     // mongoose.set("debug", true);
//     mongoose.set("strictQuery", false);
//     mongoose
//       .connect(mongodbUri)
//       .then(() => {
//         console.log("DB Connected!");
//         resolve(true);
//       })
//       .catch(reject);
//   });
// };


import sqlite3 from 'sqlite3';
import { execute } from '../utils/sql';

export const initDB = async (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      // Initialize the database connection
      const db = new sqlite3.Database('./task.db', async (err) => {
        if (err) {
          console.error('Error connecting to SQLite database:', err.message);
          return reject(false); // Reject promise on error
        }
  
        console.log('Connected to the SQLite database.');
  
        try {
          // SQL to create the table
          const sql = `
            CREATE TABLE IF NOT EXISTS tasks (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              title TEXT NOT NULL,
              description TEXT,
              date TEXT,
              status TEXT
            );
          `;
  
          // Execute the SQL query
          await execute(db, sql);
          console.log('Table created successfully.');
          resolve(true); // Resolve promise on success
        } catch (error) {
          console.error('Error executing SQL:', error);
          reject(false); // Reject promise on SQL execution error
        } finally {
          db.close((closeErr) => {
            if (closeErr) {
              console.error('Error closing the database connection:', closeErr.message);
            } else {
              console.log('Database connection closed.');
            }
          });
        }
      });
    });
  };
