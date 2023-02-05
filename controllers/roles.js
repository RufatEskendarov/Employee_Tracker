const db = require("../config/connection.js");

const allRoles = async function () {
  const sqlQuery =
    "SELECT roles.id, title, name AS department, salary FROM roles INNER JOIN departments ON roles.department_id = departments.id ORDER BY roles.id ASC";
  return db.query(sqlQuery, (err, res) =>
    console.table("\n LIST OF COMPANY EMPLOYEES", res)
  );
};

const addEmployee = function () {};

module.exports = { allRoles };
