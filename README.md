<!-- omit in toc -->
# Employee Tracker

<!-- omit in toc -->
## Description

This is a command-line application that manages a company's employee database, using Node.js, Inquirer, console.table and MySQL. When the application is invoked, user is prompted to choose one of the options including 'View all departments', 'Add department', 'Delete department', 'View all roles', 'Add role', 'Delete role', 'View all employees', 'View employees by manager', 'View employees by department', 'Add employee', 'Update employee role', 'Update employee manager', 'Delete employee', 'View the total utilized budget of department'. The information user changes is automatically stored in the database.

<!-- omit in toc -->
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Installation
- Install [Node.js v16](https://nodejs.org/en/blog/release/v16.16.0/) and [npm](https://www.npmjs.com/)
- Install [MySQL Server](https://dev.mysql.com/doc/mysql-getting-started/en/#mysql-getting-started-installing)
- Install npm packages:
  ```
  npm install
  ```

## Usage
1. Create your database and seed test data into the database with MySQL shell commands:
    ```
    mysql -u root -p
    ```
    ```shell
    mysql> source db/schema.sql;
    mysql> source db/seeds.sql;
    mysql> quit;
    ```
2. Execute the app:
    ```
    npm start
    ```
- Walkthrough video
<video src="https://user-images.githubusercontent.com/106784125/218016874-35230aca-69c7-4a38-a463-fee43c72b2d0.mp4"></video>
  - Features demonstrated in the video
    - Department:
      - 'View all departments'
      - 'Add department'
      - 'Delete department'
      - 'View the total utilized budget of department'
    - Role:
      - 'View all roles'
      - 'Add role'
      - 'Delete role'
    - Employee:
      - 'View all employees'
      - 'View employees by manager'
      - 'View employees by department'
      - 'Add employee'
      - 'Update employee role'
      - 'Update employee manager'
      - 'Delete employee'
    - 'Quit'

## License
Copyright © 2022 [Claire Cho](https://github.com/clairehwcho).
