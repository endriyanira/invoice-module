const mysql = require("mysql2");

const dbConfig = {
  host: "localhost",
  user: "wida_tech_user",
  password: "password",
  database: "wida_tech_invoice",
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
  console.log("masuk get invoices");
  const sql = `SELECT * FROM invoices`;
  const results = await query(sql);
  console.log(results);
  return results;
};

// Export the database functions
module.exports = {
  getInvoices,
};
