const connection = require("./connection.js");

const orm = {
    viewAllEmployees:() => {
        connection.query(
            `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(manager.last_name, ' ', manager.last_name) AS "manager"
            FROM employee
            LEFT JOIN employee AS manager ON employee.manager_id = manager.id
            INNER JOIN role ON employee.role_id  = role.id
            INNER JOIN department ON role.department_id = department.id;`,
            (err, data) => {
              if (err) throw err;
              console.log("\n");
              console.table(data);
            }
    )},
    
    viewAllEmployeesByDepartment:() => {
        connection.query(
            `SELECT department.dept_name, employee.first_name, employee.last_name FROM employee
            INNER JOIN role ON employee.role_id = role.id
            INNER JOIN department ON role.department_id = department.id;`,
            (err, data) => {
              if (err) throw err;
              console.table(data);
            }
    )},
    
    viewAllEmployeesByManager:() => {
        connection.query(
            `SELECT employee.manager_id, employee.first_name, employee.last_name FROM employee WHERE employee.manager_id IS NOT NULL;`,
            (err, data) => {
              if (err) throw err;
              console.table(data);
            }
    )},
    
    addAnEmployee:(firstName, lastName, role_id, manager) => {
        
        let queryOne = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES(?, ?, ?, ?)`

        connection.query (queryOne, [firstName, lastName, 1, 1], 
            (err, data) => {
                if (err) throw err;
                console.table(data);
              });
    },

    removeAnEmployee:() => {
        
    }
};




module.exports = orm;