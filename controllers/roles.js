const db = require("../config/connection.js");
const inquirer = require("inquirer");

const allRoles = function () {
  const sqlQuery =
    "SELECT roles.id, title, name AS department, salary FROM roles INNER JOIN departments ON roles.department_id = departments.id ORDER BY roles.id ASC";
  return db.promise().query(sqlQuery);
};

const addRole = async function () {
  await inquirer
    .prompt([
      {
        type: "input",
        name: "newRole",
        message:
          "Please enter the title of the position you would like to add:",
      },
      {
        type: "input",
        name: "depId",
        message:
          "Please enter the ID of the relevant department for this role:",
      },
      {
        type: "input",
        name: "salary",
        message: "Please enter the appropriate salary for this role:",
      },
    ])
    .then((res) => {
      db.query(
        `INSERT INTO roles (title, department_id, salary) VALUES ("${res.newRole}", ${res.depId}, ${res.salary})`
      );
    });
};

const deleteRole = async function () {
  await inquirer
    .prompt([
      {
        type: "input",
        name: "deletedRole",
        message: "Please enter the name of the role you would like to remove:",
      },
    ])
    .then((res) => {
      db.query(`DELETE FROM roles WHERE title = "${res.deletedRole}" LIMIT 1`);
    });
};

module.exports = { allRoles, addRole, deleteRole };
