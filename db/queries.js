const mysql = require('mysql2');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'employees_db'
    }
);

const showAllDepartments = function () {
    db.query('SELECT id, name FROM department', function (err, results) {
        console.table(results);
    });
};

const showAllRoles = function () {
    db.query('SELECT * FROM role', function (err, results) {
        console.table(results);
    });
};

const showAllEmployees = function () {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
    });
};

module.exports = {
    showAllDepartments,
    showAllRoles,
    showAllEmployees
}