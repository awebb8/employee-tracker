const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Greenville252my",
    database: "employee_tracker_db",
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;