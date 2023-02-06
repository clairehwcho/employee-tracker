const inquirer = require('inquirer');
const {
    showAllDepartments,
    showAllRoles,
    showAllEmployees
} = require('./db/queries');

const questions = [
    {
        name: 'menu',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees'
            // 'Add a department',
            // 'Add a role',
            // 'Add an employee',
            // 'Update an employee role'
        ]
    }
];

const init = function () {
    inquirer
        .prompt(questions)
        .then((answers) => {
            if (answers.menu === 'View all departments') {
                showAllDepartments();
            }
            else if (answers.menu === 'View all roles') {
                showAllRoles();
            }
            else if (answers.menu === 'View all employees') {
                showAllEmployees();
            }
            // else if (answers.menu === 'Add a department') {
            //     // add department name
            // }
            // else if (answers.menu === 'Add a role') {
            //     // add role name, salary, department
            // }
            // else if (answers.menu === 'Add an employee') {
            //     // add first name, last name, role, manager
            // }
            // else if (answers.menu === 'Update an employee role') {
            //     // show choices of employees
            //     // choose employee and enter new role
            // }

        })
};

init();