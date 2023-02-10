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
            'Update an employee manager',
            'Quit'
        ]
    }
];

const departmentQuestions = [
    {
        name: 'name',
        type: 'input',
        message: 'What is the name of the department?'
    }
];

const roleQuestions = [
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

const employeeQuestions = [
    [{
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
    }],
    [{
        name: 'updatedRoleEmployeeName',
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
    }],
    [{
        name: 'updatedManagerEmployeeName',
        type: 'list',
        message: 'Which employee\'s manager do you want to update?',
        choices: function () {
            return employee.getEmployeeNames();
        }
    },
    {
        name: 'updatedManagerName',
        type: 'list',
        message: 'Which manager do you want to assign the selected employee?',
        choices: function () {
            return employee.getEmployeeNames();
        }
    }],
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
                    const newDepartmentObj = await inquirer.prompt(departmentQuestions);
                    const { name } = newDepartmentObj;
                    department.addDepartment(name)
                        .then(() => {
                            console.info(`'${name}' added to the database`);
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
                    const newRoleObj = await inquirer.prompt(roleQuestions);
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
                    const newEmployeeObj = await inquirer.prompt(employeeQuestions[0]);
                    const { firstName, lastName, roleTitle, managerName } = newEmployeeObj;
                    employee.addEmployee(firstName, lastName, roleTitle, managerName)
                        .then(() => {
                            init();
                        })
                    break;
                case 'Update an employee role':
                    const updatedRoleObj = await inquirer.prompt(employeeQuestions[1]);
                    const { updatedRoleEmployeeName, updatedRoleTitle } = updatedRoleObj;
                    employee.updateEmployeeRole(updatedRoleEmployeeName, updatedRoleTitle)
                        .then(() => {
                            init();
                        })
                    break;
                case 'Update an employee manager':
                    const updatedManagerObj = await inquirer.prompt(employeeQuestions[2]);
                    const { updatedManagerEmployeeName, updatedManagerName } = updatedManagerObj;
                    employee.updateEmployeeManager(updatedManagerEmployeeName, updatedManagerName)
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
