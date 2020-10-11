const connection = require("./connection.js");

const orm = {
    viewAllEmployees:() => {
        connection.query(
            `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.dept_name, CONCAT(manager.first_name, ' ', manager.last_name) AS "manager"
            FROM employee
            LEFT JOIN employee AS manager ON employee.manager_id = manager.id
            INNER JOIN role ON employee.role_id  = role.id
            INNER JOIN department ON role.department_id = department.id;`,
            (err, data) => {
              if (err) throw err;
              console.log("\n\n\n");
              console.table(data);
            }
    )},
    
    viewEmployeesByDepartment:() => {
        connection.query(
            `SELECT department.dept_name, employee.first_name, employee.last_name FROM employee
            INNER JOIN role ON employee.role_id = role.id
            INNER JOIN department ON role.department_id = department.id;`,
            (err, data) => {
              if (err) throw err;
              console.log("\n\n\n");
              console.table(data);
            }
    )},
    
    viewEmployeesByManager:() => {
        connection.query(
            `SELECT CONCAT(manager.first_name, ' ', manager.last_name) AS "manager", employee.first_name, employee.last_name
            FROM employee
            LEFT JOIN employee AS manager ON employee.manager_id = manager.id
            INNER JOIN role ON employee.role_id  = role.id
            INNER JOIN department ON role.department_id = department.id
            WHERE employee.manager_id IS NOT NULL
            ORDER by employee.manager_id;`,
            (err, data) => {
              if (err) throw err;
              console.log("\n\n\n");
              console.table(data);
            }
    )},
    
    addAnEmployee:(firstName, lastName, role_id, manager) => {
        
        let queryOne = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES(?, ?, ?, ?)`

        connection.query (queryOne, [firstName, lastName, 1, 1], (err, data) => {
                if (err) throw err;
                console.log("\n\n\n");
                console.table(data);
              });
    },

    removeAnEmployee:(employee, cb) => {
        
        let queryOne = `DELETE FROM employee WHERE employee.id = ?;`
        
        connection.query(queryOne, [employee], (err, data) => {
            if (err) throw err;
            console.log("\n\n\n");
            console.table(data);
            
        }
        );
    },

    updateAnEmployee:(employee, role, cb) => {
        
        let queryOne = `UPDATE role INNER JOIN employee ON employee.role_id = role.id
        SET title = ? WHERE employee.id = ?;`
        
        connection.query(queryOne, [role, employee], (err, data) => {
            if (err) throw err;
            console.log("\n\n\n");
            console.table(data);
        }
        );
    },
    updateManager:(employee, manager_id) => {
        
        let queryOne = `UPDATE employee
        SET manager_id = ? WHERE employee.id = ?;`
        
        connection.query(queryOne, [manager_id, employee], (err, data) => {
            if (err) throw err;
            console.log("\n\n\n")
            console.table(data);
        }
        );
    }, 
    viewRoles:() => {
        connection.query(
            `SELECT title, department_id FROM role`,
            (err, data) => {
              if (err) throw err;
              console.log("\n\n\n");
              console.table(data);
            }
    )},
    
};




module.exports = orm;