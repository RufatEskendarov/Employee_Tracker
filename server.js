const inquirer = require("inquirer");
const cTable = require("console.table");
const db = require("./config/connection.js");

const departments = require("./controllers/departments.js");

const roles = require("./controllers/roles.js");
const employees = require("./controllers/employees.js");

function appStarter() {
  const userResponses = [
    {
      type: "list",
      name: "userChoice",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "Delete Department",
        "Delete Role",
        "Delete Employee",
        "Quit",
      ],
    },
  ];

  inquirer.prompt(userResponses).then((res) => {
    console.log(res.userChoice);
    switch (res.userChoice) {
      case "View All Employees":
        employees.allEmployees();

        break;
      case "View All Departments":
        setTimeout(departments.allDepartments, 2500);
        appStarter();

        break;
      case "View All Roles":
        roles.allRoles();
        break;
      case "Quit":
        db.end();
        break;
      default:
        db.end();
    }
  });
}

appStarter();
