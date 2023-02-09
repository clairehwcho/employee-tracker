const inquirer = require('inquirer');
const { connection } = require('./config/connection');
const Department = require('./lib/Department');
const Role = require('./lib/Role');
const Employee = require('./lib/Employee');

const department = new Department();
const role = new Role();
const employee = new Employee();

// A list of questions for initial prompt
const initialQuestions = [
    {
        name: 'userChoice',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'Add a department',
            'View all roles',
            'Add a role',
            'View all employees',
            'Add an employee',
            'Update an employee role',
            'Quit'
        ]
    }
];

const questionToAddDepartment = [
    {
        name: 'name',
        type: 'input',
        message: 'What is the name of the department?'
    }
];

const questionsToAddRole = [
    {
        name: 'title',
        type: 'input',
        message: 'What is the title of the role?',
    },
    {
        name: 'salary',
        type: 'number',
        message: 'What is the salary of the role?'
    },
    {
        name: 'departmentName',
        type: 'list',
        message: 'Which department does the role belong to?',
        choices: function () {
            return department.getDepartmentNames();
        }
    }
];

const questionsToAddEmployee = [
    {
        name: 'firstName',
        type: 'input',
        message: 'What is the employee\'s first name?'
    },
    {
        name: 'lastName',
        type: 'input',
        message: 'What is the employee\'s last name?'
    },
    {
        name: 'roleTitle',
        type: 'list',
        message: 'What is the employee\'s role?',
        choices: function () {
            return role.getRoleTitles();
        }
    },
    {
        name: 'managerName',
        type: 'list',
        message: 'Who is the employee\'s manager?',
        choices: function () {
            return employee.getEmployeeNames();
        }
    },
];

const questionsToUpdateEmployee = [
    {
        name: 'employeeName',
        type: 'list',
        message: 'Which employee\'s role do you want to update?',
        choices: function () {
            return employee.getEmployeeNames();
        }
    },
    {
        name: 'updatedRoleTitle',
        type: 'list',
        message: 'Which role do you want to assign the selected employee?',
        choices: function () {
            return role.getRoleTitles();
        }
    },
];

const init = function () {
    inquirer
        .prompt(initialQuestions)
        .then(async (answers) => {
            switch (answers.userChoice) {
                case 'View all departments':
                    department.showAllDepartments()
                        .then(() => {
                            init();
                        });
                    break;
                case 'Add a department':
                    const newDepartmentObj = await inquirer.prompt(questionToAddDepartment);
                    const { name } = newDepartmentObj;
                    department.addDepartment(name)
                        .then(() => {
                            init();
                        });
                    break;
                case 'View all roles':
                    role.showAllRoles()
                        .then(() => {
                            init();
                        });
                    break;
                case 'Add a role':
                    const newRoleObj = await inquirer.prompt(questionsToAddRole);
                    const { title, salary, departmentName } = newRoleObj;
                    role.addRole(title, salary, departmentName)
                        .then(() => {
                            init();
                        });
                    break;
                case 'View all employees':
                    employee.showAllEmployees()
                        .then(() => {
                            init();
                        });
                    break;
                case 'Add an employee':
                    const newEmployeeObj = await inquirer.prompt(questionsToAddEmployee);
                    const { firstName, lastName, roleTitle, managerName } = newEmployeeObj;
                    employee.addEmployee(firstName, lastName, roleTitle, managerName)
                        .then(() => {
                            init();
                        })
                    break;
                case 'Update an employee role':
                    const updatedEmployeeObj = await inquirer.prompt(questionsToUpdateEmployee);
                    const { employeeName, updatedRoleTitle } = updatedEmployeeObj;
                    employee.updateEmployee(employeeName, updatedRoleTitle)
                        .then(() => {
                            init();
                        })
                    break;
                case 'Quit':
                    connection.end();
                    break;
            }
        })
};

init();
