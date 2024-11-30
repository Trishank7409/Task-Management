import sqlite3 from 'sqlite3';

export const execute = async (db: sqlite3.Database, sql: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.exec(sql, (err) => {
      if (err) {
        reject(err); // Reject the promise if there's an error
      } else {
        resolve(); // Resolve the promise on successful execution
      }
    });
  });
};

  