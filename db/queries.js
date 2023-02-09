// Import mysql2 package
const mysql = require('mysql2');
// Import console.table package
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
    const sql = 'SELECT id, name FROM department ORDER BY id ASC;';
    db.promise()
        .query(sql)
        .then(([rows, fields]) => {
            console.table(rows);
        })
};


const showAllRoles = function () {
    const sql = 'SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON department.id = role.department_id ORDER BY role.id ASC;';
    db.promise()
        .query(sql)
        .then(([rows, fields]) => {
            console.table(rows);
        });
};

const showAllEmployees = function () {
    const sql = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, \' \', manager.last_name) AS manager From employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id LEFT Join employee AS manager ON manager.id = employee.manager_id ORDER BY employee.id ASC;';
    db.promise()
        .query(sql)
        .then(([rows, fields]) => {
            console.table(rows);
        });
};

module.exports = {
    db,
    showAllDepartments,
    showAllRoles,
    showAllEmployees
}