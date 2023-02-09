const { connection } = require('../config/connection');
const cTable = require('console.table');

class Department {
    constructor (id, name) {
        this.id = id;
        this.name = name;
    }

    showAllDepartments () {
        const sql = `SELECT id, name FROM department ORDER BY id ASC;`;

        return connection.promise()
            .query(sql)
            .then(([rows, fields]) => {
                console.table(rows);
            })
    };

    getDepartmentNames () {
        const query = `SELECT name FROM department;`;

        return connection.promise()
            .query(query)
            .then(([rows, fields]) => {
                let departmentArr = [];
                rows.map((department) => {
                    departmentArr.push(department['name']);
                });
                return departmentArr;
            })
    };

    addDepartment (name) {
        const query = `INSERT INTO department (name) VALUES ('${name}');`;

        return connection.promise()
            .query(query)
            .then(([rows, fields]) => {
                console.log(`'${name}' added to the database`);
            })
    }
}

module.exports = Department;