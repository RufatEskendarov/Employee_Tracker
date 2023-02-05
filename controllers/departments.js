const db = require("../config/connection.js");

const allDepartments = async function () {
  const sqlQuery = "SELECT * FROM departments";
  return db.query(sqlQuery, (err, res) =>
    console.table("\n LIST OF ALL DEPARTMENTS \nOF THE COMPANY", res)
  );
};

const addEmployee = function () {};

module.exports = { allDepartments };
