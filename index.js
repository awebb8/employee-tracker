const inquirer = require("inquirer");
const mysql = require("mysql");
const connection = require("./config/connection.js");
const orm = require("./config/orm.js");

const jobTitles = [];
const employeesArray = [];

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
    connection.query(`SELECT CONCAT(first_name,'',last_name) FROM employee;`, (err, results) => {
        if (err) throw err;
        for (let i = 0; i < results.length; i++) {
            const employees = {
                name: results[i]
            };
            console.log(results[i]);
            employeesArray.push(employees);
        }
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
          "Update an employee's role", 
          "Update an employee's manager", 
          "View all roles"]
        }
    ]).then(({ selection }) => {
        console.log(selection);
        if (selection === "View all employees") {
            orm.viewAllEmployees();
            runEmployeeTracker();
        } else if (selection === "View all employees by department") {
            orm.viewAllEmployeesByDepartment();
            runEmployeeTracker();
        } else if (selection === "View all employees by manager") {
            orm.viewEmployeesByManager();
            runEmployeeTracker();
        } else if (selection === "Add an employee") {
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
          ])
          .then((response) => {
            // let roleID = orm.jobTitles.indexOf(response, title) + 1;
            orm.addAnEmployee(response.firstName, response.lastName, response.role, response.manager, response.salary);
            runEmployeeTracker();
            })
            // .catch ((err) => {
            //     console.log (err)
            // })
          
        } else if (selection === "Update an employee's role") {
            updateJobTitles();
            updateEmployeesArray();
            console.log(employeesArray);
            inquirer.prompt([
            {
                name: "employee",
                message: "Which employee's role do you want to update?",
                type: "list",
                choices: employeesArray
            },
            {
                name: "role",
                message: "What is the employee's new role?",
                type: "list",
                choices: jobTitles
            }
          ])
          .then((response) => {
            // let roleID = orm.jobTitles.indexOf(response, title) + 1;
            orm.addAnEmployee(response.firstName, response.lastName, response.role, response.manager);
            runEmployeeTracker();
            })
            // .catch ((err) => {
            //     console.log (err)
            // })
          
        }
    })
}


runEmployeeTracker();



