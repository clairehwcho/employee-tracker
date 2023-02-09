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

    getEmployeeNames () {
        const query = `SELECT first_name, last_name FROM employee;`;

        return connection.promise()
            .query(query)
            .then(([rows, fields]) => {
                let employeeArr = [];
                employeeArr.push('None');
                rows.map((employee) => {
                    const fullName = employee['first_name'] + ' ' + employee['last_name']
                    employeeArr.push(fullName);
                });
                return employeeArr;
            })
    };

    addEmployee (firstName, lastName, roleTitle, managerName) {
        const sql1 = `SELECT id FROM role WHERE title = '${roleTitle}';`;

        return connection.promise()
            .query(sql1)
            .then(([rows, fields]) => {
                const roleId = rows[0]['id'];

                if (managerName === 'None') {
                    const sql2 = `INSERT INTO employee (first_name, last_name, role_id) VALUES ('${firstName}', '${lastName}', '${roleId}');`;

                    connection.promise()
                        .query(sql2)
                        .then(([rows, fields]) => {
                            console.log(`'${firstName} ${lastName}' added to the database`);
                        })
                }
                else {
                    const sql3 = `SELECT id FROM employee WHERE first_name = '${managerName.split(' ')[0]}' AND last_name = '${managerName.split(' ')[1]}';`;

                    connection.promise()
                        .query(sql3)
                        .then(([rows, fields]) => {
                            const managerId = rows[0]['id'];

                            const sql4 = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', '${roleId}', '${managerId}');`;

                            connection.promise()
                                .query(sql4)
                                .then(([rows, fields]) => {
                                    console.log(`'${firstName} ${lastName}' added to the database`);
                                })
                        })
                }
            })
    }
};

module.exports = Employee;