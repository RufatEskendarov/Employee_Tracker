const inquirer = require("inquirer");
const db = require("./config/connection.js");
const cTable = require("console.table");

const {
  allDepartments,
  addDepartment,
  deleteDepartment,
  showBudget,
} = require("./controllers/departments");

const { allRoles, addRole, deleteRole } = require("./controllers/roles.js");
const {
  allEmployees,
  addEmployee,
  deleteEmployee,
  employeesByManager,
  employeesByDep,
  updateEmployee,
} = require("./controllers/employees.js");

const printAllEmployees = async () => {
  const data = await allEmployees();
  console.table("\nEMPLOYEES", data[0]);
};

const printEmployeesByManager = async () => {
  const data = await employeesByManager();
  console.table("\nEMPLOYEES\nBY MANAGER", data[0]);
};

const printEmployeesByDep = async () => {
  const data = await employeesByDep();
  console.table("\nEMPLOYEES\nBY DEPARTMENT", data[0]);
};

const printAllRoles = async () => {
  const data = await allRoles();
  console.table("\nPOSITIONS", data[0]);
};
const printAllDepartments = async () => {
  const data = await allDepartments();
  console.table("\nDEPARTMENTS", data[0]);
};

const printBudget = async () => {
  const data = await showBudget();
  console.table("\nDEPARTAMENTAL BUDGET", data[0]);
};

const updateEmp = async () => {
  await updateEmployee();
  await printAllEmployees();
};

const addNewDepartment = async () => {
  await addDepartment();
  await printAllDepartments();
};
const addNewRole = async () => {
  await addRole();
  await printAllRoles();
};

const addNewEmployee = async () => {
  await addEmployee();
  await printAllEmployees();
};

const delDepartment = async () => {
  await deleteDepartment();
  await printAllDepartments();
};

const delRole = async () => {
  await deleteRole();
  await printAllRoles();
};

const delEmployee = async () => {
  await deleteEmployee();
  await printAllEmployees();
};

const appStarter = () => {
  const userResponse = [
    {
      type: "list",
      name: "userChoice",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Roles",
        "View All Departments",
        "Add Employee",
        "Add Role",
        "Add Department",
        "Delete Employee",
        "Delete Role",
        "Delete Department",
        "Update Employee Role",
        "Show Departmental Dudget",
        "View Employees by Manager",
        "View Employees by Department",
        "Update Employee Managers",
        "Quit",
      ],
    },
  ];

  inquirer.prompt(userResponse).then((res) => {
    switch (res.userChoice) {
      case "View All Employees":
        printAllEmployees().then(() => appStarter());
        // appStarter();

        break;
      case "View All Departments":
        printAllDepartments().then(() => appStarter());

        break;
      case "View All Roles":
        printAllRoles().then(() => appStarter());

        break;
      case "Add Department":
        addNewDepartment().then(() => appStarter());

        break;
      case "Add Role":
        addNewRole().then(() => appStarter());

        break;
      case "Add Employee":
        addNewEmployee().then(() => appStarter());

        break;
      case "Delete Department":
        delDepartment().then(() => appStarter());

        break;

      case "Delete Role":
        delRole().then(() => appStarter());

        break;
      case "Delete Employee":
        delEmployee().then(() => appStarter());

        break;

      case "Show Departmental Dudget":
        printBudget().then(() => appStarter());

        break;
      case "View Employees by Manager":
        printEmployeesByManager().then(() => appStarter());

        break;
      case "View Employees by Department":
        printEmployeesByDep().then(() => appStarter());

        break;
      case "Update Employee Managers":
        updateEmp().then(() => appStarter());

        break;
      case "Quit":
        db.end();
        break;
      default:
        db.end();
    }
  });
};

appStarter();
