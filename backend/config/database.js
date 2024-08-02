require("dotenv").config();
const mysql = require("mysql2");

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const connection = mysql.createConnection(dbConfig);

try {
  connection.query("SELECT 1", (err, results) => {
    if (err) {
      console.log("Failed to connect to database:", err);
    } else {
      console.log("Connected to database!");
    }
  });
} catch (err) {
  console.log("Failed to connect to database:", err);
}

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Function to execute a query
const query = async (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, results) => {
          connection.release();
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      }
    });
  });
};

const getInvoices = async () => {
  const sql = `SELECT * FROM invoices`;
  const results = await query(sql);
  return results;
};

// Export the database functions
module.exports = {
  getInvoices,
};
