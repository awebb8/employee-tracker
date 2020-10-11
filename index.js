const inquirer = require("inquirer");
const mysql = require("mysql");
const { resolve } = require("path");
const connection = require("./config/connection.js");
const orm = require("./config/orm.js");

let jobTitles = ["HR Manager", "Accountant", "Director of Marketing", "Marketing Analyst", "Director of Engineering", "Product Engineer"];
let employeesArray = [];

function updateJobTitles() {
    connection.query(`SELECT title FROM role;`, (err, results) => {
        if (err) throw err;
        for (let i = 0; i < results.length; i++) {
            const roleID = {
                name: results[i].title,
                value: results[i].role_id
            };
            jobTitles.push(roleID);
        }
    });
}

function updateEmployeesArray() {
    connection.query(`SELECT id, CONCAT(first_name, ' ', last_name) AS full_name FROM employee;`, (err, results) => {
        if (err) throw err;
        employeesArray = [];
        for (let i = 0; i < results.length; i++) {
            const employees = {
                id: results[i].id,
                name: results[i].full_name
            };
            employeesArray.push(employees);
        }
        console.table(employeesArray)
    });
}

console.log(`
________________________________________________________________________
|      _)      _)      _)      _)      _)      _)      _)      _)       |
|     (_      (_      (_      (_      (_      (_      (_      (_        |
|_   _  )_   _  )_   _  )_   _  )_   _  )_   _  )_   _  )_   _  )_   _  |
| |_| |_| |_| |_| |_| |_| |_| |_| |_| |_| |_| |_| |_| |_| |_| |_| |_| |_|
|       (_      (_      (_      (_      (_      (_      (_      (_      |
|        _)      _)       WELCOME TO MY COMPANY          _)      _)     |
|  _   _(  _   _(  _   _(  _   _(  _   _(  _   _(  _   _(  _   _(  _   _|
|_| |_| |_| |_| |_| |_| |_| |_| |_| |_| |_| |_| |_| |_| |_| |_| |_| |_| |
|      _)      _)      _)      _)      _)      _)      _)      _)       |
|     (_      (_      (_      (_      (_      (_      (_      (_        |
|_______(_______(_______(_______(_______(_______(_______(_______(_______|`)

function runEmployeeTracker() {
    inquirer.prompt([
        {
          name: "selection",
          message: "What would you like to do?",
          type: "list",
          choices: ["View all employees", 
          "View all employees by department", 
          "View all employees by manager", 
          "Add an employee", 
          "Remove an employee",
          "Update an employee's role", 
          "Update an employee's manager", 
          "View all roles"]
        }
    ]).then(({ selection }) => {
        console.log(selection);
        if (selection === "View all employees") {
            console.clear();
            orm.viewAllEmployees();
            runEmployeeTracker();
        } else if (selection === "View all employees by department") {
            console.clear();
            orm.viewEmployeesByDepartment();
            runEmployeeTracker();
        } else if (selection === "View all employees by manager") {
            console.clear();
            orm.viewEmployeesByManager();
            runEmployeeTracker();
        } else if (selection === "Add an employee") {
            console.clear();
            updateJobTitles();
            inquirer.prompt([
            {
                name: "firstName",
                message: "What is the employee's first name?",
                type: "input",
            },
            {
                name: "lastName",
                message: "What is the employee's last name?",
                type: "input",
            },
            {
                name: "role",
                message: "What is the employee's role?",
                type: "list",
                choices: jobTitles
            },
            {
                name: "manager",
                message: "Who is the employee's manager?",
                type: "list",
                choices: ["Timothy Williams", "Amber Smith", "Andrew Phillips", "Laurel Davis", "Joseph Johnson", "Jamie Miller"]
            }
          ]).then((response) => {
            orm.addAnEmployee(response.firstName, response.lastName, response.role, response.manager);
            runEmployeeTracker();
            }) 
          
        } else if (selection === "Remove an employee") {
            console.clear();
            updateEmployeesArray()
            inquirer.prompt([
                {
                    name: "employee",
                    message: "Which employee do you want to remove by ID?",
                    type: "input",
                },
            ]).then((response) => {
                orm.removeAnEmployee(response.employee);
                runEmployeeTracker();
                })

        } else if (selection === "Update an employee's role") {
            console.clear();
            updateEmployeesArray();
            inquirer.prompt([
            {
                name: "employee",
                message: "Which employee would you like to update by ID?\n",
                type: "input",
            },
            {
                name: "role",
                message: "What is the employee's new role?",
                type: "list",
                choices: jobTitles
            }
          ]).then((response) => {
            orm.updateAnEmployee(response.employee, response.role);
            runEmployeeTracker();
            })

        } else if (selection === "Update an employee's manager") {
            console.clear();
            updateEmployeesArray();
            inquirer.prompt([
            {
                name: "employee",
                message: "Which employee's manager would you like to update by ID?\n",
                type: "input",
            },
            {
                name: "manager_id",
                message: "What is the employee's manager's ID?",
                type: "input"
            }
          ]).then((response) => {
            orm.updateManager(response.employee, response.manager_id);
            runEmployeeTracker();
            })

        } else if (selection === "View all roles") {
            console.clear();
            orm.viewRoles();
            runEmployeeTracker();
        }
    })
}


runEmployeeTracker();



