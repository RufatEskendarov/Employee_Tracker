const mysql = require("mysql2");

// .env allows us hide our personal information (DB name, password & etc.)
require("dotenv").config();

// Creating connection to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log(`Connected to the company_db database.`)
);

module.exports = db;
