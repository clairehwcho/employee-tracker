const { connection } = require('../config/connection');
const cTable = require('console.table');

class Department {
    constructor (id, name) {
        this.id = id;
        this.name = name;
    };

    showAllDepartments () {
        const sql = `SELECT id, name FROM department ORDER BY id ASC;`;

        return connection.promise()
            .query(sql)
            .then(([rows, fields]) => {
                console.table(rows);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    getDepartmentNames () {
        const query = `SELECT name FROM department;`;

        return connection.promise()
            .query(query)
            .then(([rows, fields]) => {
                let departmentArr = [];

                rows.map((row) => {
                    departmentArr.push(row['name']);
                });
                return departmentArr;
            })
            .catch((err) => {
                console.error(err);
            });
    };

    addDepartment (name) {
        const query = `INSERT INTO department (name) VALUES ('${name}');`;

        return connection.promise()
            .query(query)
            .then(([rows, fields]) => {
                console.info(`'${name}' added to the database`);
            })
            .catch((err) => {
                console.error(err);
            });
    };
};

module.exports = Department;