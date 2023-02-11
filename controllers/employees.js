const db = require("../config/connection.js");

const allEmployees = function () {
  const sqlQuery =
    'SELECT e.id,e.first_name, e.last_name, title, name AS department, salary, CONCAT(m.first_name," ", m.last_name) AS manager FROM employees e LEFT JOIN employees m on e.manager_id = m.id INNER JOIN roles ON e.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id ORDER BY e.id ASC';
  return db.promise().query(sqlQuery);
};

const addEmployee = async function () {
  await inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Please enter the first name of the new employee:",
      },
      {
        type: "input",
        name: "lastName",
        message: "Please enter the last name of the new employee:",
      },
      {
        type: "input",
        name: "roleId",
        message: "Please enter role ID for the new employee:",
      },
      {
        type: "input",
        name: "managerId",
        message:
          "Please enter manager ID for new employee (If the employee is a manager enter NULL):",
      },
    ])
    .then((res) => {
      db.query(
        `INSERT INTO roles (first_name, last_name, role_id, manager_id) VALUES ("${res.firstName}", "${res.lastName}", ${res.roleId}, ${res.managerId})`
      );
    });
};

const deleteEmployee = async function () {
  await inquirer
    .prompt([
      {
        type: "input",
        name: "delEmpFirst",
        message:
          "Please enter the first name of the employee you would like to remove:",
      },
      {
        type: "input",
        name: "delEmpLast",
        message:
          "Please enter the last name of the employee you would like to remove:",
      },
    ])
    .then((res) => {
      db.query(
        `DELETE FROM roles WHERE first_name = "${res.delEmpFirst}" AND last_name = "${res.delEmpLast}" LIMIT 1`
      );
    });
};

module.exports = { allEmployees, addEmployee, deleteEmployee };
