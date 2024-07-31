const mysql = require("mysql2/promise");

const dbConfig = {
  host: "localhost",
  user: "wida_tech_user",
  password: "password",
  database: "wida_tech_invoice",
};

const db = mysql.createPool(dbConfig);

module.exports = db;
