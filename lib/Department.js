const { connection } = require('../config/connection');
const cTable = require('console.table');

class Department {
    constructor (id, name) {
        this.id = id;
        this.name = name;
    }

    showAllDepartments () {
        const sql = 'SELECT id, name FROM department ORDER BY id ASC;';
        return connection.promise()
            .query(sql)
            .then(([rows, fields]) => {
                console.table(rows);
            })
    };
}

module.exports = Department;