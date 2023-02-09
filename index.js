const inquirer = require('inquirer');
const { connection } = require('./config/connection');
const Department = require('./lib/Department');
const Role = require('./lib/Role');
const Employee = require('./lib/Employee');

// A list of questions for initial prompt
const initialQuestions = [
    {
        name: 'userChoice',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            // 'Add a department',
            // 'Add a role',
            // 'Add an employee',
            // 'Update an employee role'
            'Quit'
        ]
    }
];

const init = function () {
    inquirer
        .prompt(initialQuestions)
        .then((answers) => {
            switch (answers.userChoice) {
                case 'View all departments':
                    const department = new Department();
                    department.showAllDepartments()
                        .then(() => {
                            init();
                        });
                    break;
                case 'View all roles':
                    const role = new Role();
                    role.showAllRoles()
                        .then(() => {
                            init();
                        });
                    break;
                case 'View all employees':
                    const employee = new Employee();
                    employee.showAllEmployees()
                        .then(() => {
                            init();
                        });
                    break;
                case 'Quit':
                    connection.end();
            }
        })
};

init();
