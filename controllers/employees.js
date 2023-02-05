const db = require("../config/connection.js");

const allEmployees = async function () {
  const sqlQuery =
    'SELECT e.id,e.first_name, e.last_name, title, name AS department, salary, CONCAT(m.first_name," ", m.last_name) AS manager FROM employees e LEFT JOIN employees m on e.manager_id = m.id INNER JOIN roles ON e.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id ORDER BY e.id ASC';
  return db.query(sqlQuery, (err, res) =>
    console.table("\n LIST OF COMPANY EMPLOYEES", res)
  );
};

const addEmployee = function () {};

module.exports = { allEmployees };
