-- showAllDepartments query
SELECT
    id,
    name
FROM
    department
ORDER BY
    id ASC;

-- showAllRoles query
SELECT
    role.id,
    role.title,
    department.name AS department,
    role.salary
FROM
    role
    LEFT JOIN department ON department.id = role.department_id
ORDER BY
    role.id ASC;

-- showAllEmployees query
SELECT
    employee.id,
    employee.first_name,
    employee.last_name,
    role.title,
    department.name AS department,
    role.salary,
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager
From
    employee
    LEFT JOIN role ON role.id = employee.role_id
    LEFT JOIN department ON department.id = role.department_id
    LEFT Join employee AS manager ON manager.id = employee.manager_id
ORDER BY
    employee.id ASC;