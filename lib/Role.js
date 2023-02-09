const { connection } = require('../config/connection');
const cTable = require('console.table');

class Role {
    constructor (id, title, salary, department_id) {
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.department_id = department_id;
    }

    showAllRoles () {
        const sql = 'SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON department.id = role.department_id ORDER BY role.id ASC;';
        return connection.promise()
            .query(sql)
            .then(([rows, fields]) => {
                console.table(rows);
            });
    };
}

module.exports = Role;