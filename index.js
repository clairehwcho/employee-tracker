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
            'Add department',
            'Delete department',
            'View all roles',
            'Add role',
            'Delete role',
            'View all employees',
            'View employees by manager',
            'View employees by department',
            'Add employee',
            'Delete employee',
            'Update employee role',
            'Update employee manager',
            'View the total utilized budget of department',
            'Quit'
        ]
    }
];

// A list of questions regarding departments
const departmentQuestions = [
    // Question to add a department
    [{
        name: 'name',
        type: 'input',
        message: 'What is the name of the department?'
    }],
    // Question to delete a department
    [{
        name: 'deletedDepartment',
        type: 'list',
        message: 'Which department do you want to delete?',
        choices: function () {
            return department.getDepartmentNames();
        }
    }]
];

// A list of questions regarding roles
const roleQuestions = [
    // Questions to add a role
    [{
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
    }],
    // Question to delete a role
    [{
        name: 'deletedRole',
        type: 'list',
        message: 'Which role do you want to delete?',
        choices: function () {
            return role.getRoleTitles();
        }
    }]
];

// A list of questions regarding employees
const employeeQuestions = [
    // Questions to add a new employee
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
    // Questions to update employee's role
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
    // Questions to update employee's manager
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
    // Question to delete an employee
    [{
        name: 'deletedEmployee',
        type: 'list',
        message: 'Who do you want to delete?',
        choices: function () {
            return employee.getEmployeeNames();
        }
    }]
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
                case 'Add department':
                    const newDepartmentObj = await inquirer.prompt(departmentQuestions[0]);
                    const { name } = newDepartmentObj;
                    department.addDepartment(name)
                        .then(() => {
                            init();
                        });
                    break;
                case 'Delete department':
                    const deletedDepartmentObj = await inquirer.prompt(departmentQuestions[1]);
                    const { deletedDepartment } = deletedDepartmentObj;
                    department.deleteDepartment(deletedDepartment)
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
                case 'Add role':
                    const newRoleObj = await inquirer.prompt(roleQuestions[0]);
                    const { title, salary, departmentName } = newRoleObj;
                    role.addRole(title, salary, departmentName)
                        .then(() => {
                            init();
                        });
                    break;
                case 'Delete role':
                    const deletedRoleObj = await inquirer.prompt(roleQuestions[1]);
                    const { deletedRole } = deletedRoleObj;
                    role.deleteRole(deletedRole)
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
                case 'View employees by manager':
                    employee.showEmployeesByManager()
                        .then(() => {
                            init();
                        });
                    break;
                case 'View employees by department':
                    employee.showEmployeesByDepartment()
                        .then(() => {
                            init();
                        });
                    break;
                case 'Add employee':
                    const newEmployeeObj = await inquirer.prompt(employeeQuestions[0]);
                    const { firstName, lastName, roleTitle, managerName } = newEmployeeObj;
                    employee.addEmployee(firstName, lastName, roleTitle, managerName)
                        .then(() => {
                            init();
                        })
                    break;
                case 'Update employee role':
                    const updatedRoleObj = await inquirer.prompt(employeeQuestions[1]);
                    const { updatedRoleEmployeeName, updatedRoleTitle } = updatedRoleObj;
                    employee.updateEmployeeRole(updatedRoleEmployeeName, updatedRoleTitle)
                        .then(() => {
                            init();
                        })
                    break;
                case 'Update employee manager':
                    const updatedManagerObj = await inquirer.prompt(employeeQuestions[2]);
                    const { updatedManagerEmployeeName, updatedManagerName } = updatedManagerObj;
                    employee.updateEmployeeManager(updatedManagerEmployeeName, updatedManagerName)
                        .then(() => {
                            init();
                        })
                    break;
                case 'Delete employee':
                    const deletedEmployeeObj = await inquirer.prompt(employeeQuestions[3]);
                    const { deletedEmployee } = deletedEmployeeObj;
                    employee.deleteEmployee(deletedEmployee)
                        .then(() => {
                            init();
                        });
                    break;
                case 'View the total utilized budget of department':
                    department.showBudgetByDepartment()
                        .then(() => {
                            init();
                        });
                    break;
                case 'Quit':
                    connection.end();
                    break;
            }
        })
};

init();
