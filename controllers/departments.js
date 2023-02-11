const db = require("../config/connection.js");
const inquirer = require("inquirer");

const allDepartments = () => {
  const sql = "SELECT * FROM departments";
  return db.promise().query(sql);
};

const addDepartment = async function () {
  await inquirer
    .prompt([
      {
        type: "input",
        name: "newDepartment",
        message: "What is the name of the department?",
      },
    ])
    .then((res) => {
      db.query(
        `INSERT INTO departments (name) VALUES ("${res.newDepartment}")`
      );
    });
};

const deleteDepartment = async function () {
  await inquirer
    .prompt([
      {
        type: "input",
        name: "deletedDepartment",
        message:
          "Please enter the name of the department you would like to remove:",
      },
    ])
    .then((res) => {
      db.query(
        `DELETE FROM departments WHERE name = "${res.deletedDepartment}" LIMIT 1`
      );
    });
};

module.exports = { allDepartments, addDepartment, deleteDepartment };
