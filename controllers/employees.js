const db = require("../config/connection.js");
const inquirer = require("inquirer");

const allEmployees = function () {
  const sqlQuery =
    'SELECT e.id,e.first_name, e.last_name, title, name AS department, salary, CONCAT(m.first_name," ", m.last_name) AS manager FROM employees e LEFT JOIN employees m on e.manager_id = m.id INNER JOIN roles ON e.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id ORDER BY e.id ASC';
  return db.promise().query(sqlQuery);
};

const employeesByManager = function () {
  const sqlQuery =
    'SELECT CONCAT(e.first_name," ", e.last_name) AS employee, CONCAT(m.first_name," ", m.last_name) AS manager FROM employees e LEFT JOIN employees m on e.manager_id = m.id INNER JOIN roles ON e.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id ORDER BY e.id ASC';
  return db.promise().query(sqlQuery);
};

const employeesByDep = function () {
  const sqlQuery =
    'SELECT CONCAT(e.first_name," ", e.last_name) AS name, name AS department FROM employees e INNER JOIN roles ON e.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id ';
  return db.promise().query(sqlQuery);
};

const updateEmployee = async function () {
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
        name: "managerId",
        message:
          "Enter the Manager ID for this worker (If there is no manager or the worker is assigned as a manager, enter NULL):",
      },
    ])
    .then((res) => {
      db.query(
        `UPDATE employees SET manager_id = ${res.managerId} WHERE first_name = "${res.firstName}" AND last_name = "${res.lastName}" LIMIT 1`
      );
    });
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
        `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${res.firstName}", "${res.lastName}", ${res.roleId}, ${res.managerId})`
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
        `DELETE FROM employees WHERE first_name = "${res.delEmpFirst}" AND last_name = "${res.delEmpLast}" LIMIT 1`
      );
    });
};

module.exports = {
  allEmployees,
  addEmployee,
  deleteEmployee,
  employeesByManager,
  employeesByDep,
  updateEmployee,
};
