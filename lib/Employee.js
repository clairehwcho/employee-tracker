const { connection } = require('../config/connection');
const cTable = require('console.table');

class Employee {
    constructor (id, first_name, last_name, role_id, manager_id) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
    }

    showAllEmployees () {
        const sql = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, \' \', manager.last_name) AS manager From employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id LEFT Join employee AS manager ON manager.id = employee.manager_id ORDER BY employee.id ASC;';
        return connection.promise()
            .query(sql)
            .then(([rows, fields]) => {
                console.table(rows);
            });
    };
}

module.exports = Employee;