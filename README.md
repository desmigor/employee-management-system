# Employee Management System

## Project Overview

The Employee Management System (EMS) is a comprehensive web application designed to manage and streamline various administrative tasks within an organization. It features two user roles: Admin and Employee. Admin users have the ability to manage employee records, departments, and daily attendance, while employee users can view their own profile, salary, department information, and attendance records.

### Key Features:

#### Admin Functionalities:

- Quick View Dashboard: Displays total admins, total employees, and total salary.
- Manage Employees: Add, view, edit, and delete employee records.
- Manage Departments: Add and view department details.
- Attendance Management: Record and view daily attendance.
- Admin Profile: View and update admin profile.
- View and manage lists of admins and employees.

#### Employee Functionalities:

- Personal Dashboard: Displays employee name, salary, email, department, and a list of their attendance records.

## System Architecture

The system is built on a client-server architecture:

- Frontend: Developed using React.js for building user interfaces and handling user interactions.
- Backend: Built with Express.js, serving RESTful APIs to the frontend and managing business logic.
- Database: MySQL database running on a local server provided by XAMPP, storing all data.

### Security Features:

- Password Encryption: Employee and admin passwords are stored as hashed values in the database using the bcrypt library. This ensures that sensitive information is protected against unauthorized access.
- JWT Authentication: JSON Web Tokens (jwt) are used to secure the authentication process, ensuring that only authorized users can access certain functionalities.

## Database Design

The database for the Employee Management System is designed to efficiently store and manage all necessary information related to employees, departments, attendance, and administrative functions. The database is structured using four interrelated tables: Employee, Attendance, Department, and Admin. The relationships between these tables are established using foreign keys, ensuring data integrity and consistency.

To run the database:

- Run XAMPP app
- Turn on Apache server and MySQL database

![database-design](/report-images/database-design.png)

### Tables Descriptions:

#### Admin Table:

- id (Primary Key): A unique identifier for each admin user.
- email: The admin's email address, used for login and communication.
- password (Hashed): The admin's password, securely stored using hashing techniques.
- role: Defines the role or level of access of the admin within the system.
- name: The name of the admin.

##### Relationships:

While the Admin table is independent and does not reference other tables, it is crucial for managing system access and ensuring that administrative functions are carried out by authorized personnel only.

#### Employee Table:

id (Primary Key): A unique identifier for each employee.
name: The name of the employee.
email: The employee's email address, used for login and communication.
password (Hashed): The employee's password, securely stored using hashing techniques.
salary: The employee's salary.
address: The employee's residential address.
image: A path or URL to the employee's profile image.
department_id (Foreign Key): Links the employee to their respective department.

##### Relationships:

The department_id field in the Employee table is a foreign key that references the id field in the Department table. This relationship ensures that each employee is associated with one department, maintaining organizational structure.

#### Department Table:

id (Primary Key): A unique identifier for each department.
name: The name of the department (e.g., HR, IT, Finance).

Relationships:
The Department table serves as a reference for the department_id field in the Employee table. This relationship ensures that every employee is assigned to a valid department, which is essential for organizational management and reporting.

#### Attendance Table:

id (Primary Key): A unique identifier for each attendance record.
date: The date of the attendance record.
time: The time the attendance was recorded.
employee_id (Foreign Key): Links the attendance record to the specific employee.
status: The status of the employee's attendance (e.g., Present, Absent, etc.).

##### Relationships:

The employee_id field in the Attendance table is a foreign key that references the id field in the Employee table. This relationship allows the system to track the attendance of each employee, ensuring that all attendance records are properly associated with the correct individual.

## Backend Development

The backend is developed using Express.js. It handles data processing, business logic, and communication with the MySQL database. The key modules used in the backend include:

- con: Manages the database connection using a custom utility module.
- jwt: Used for generating and verifying JSON Web Tokens for secure user authentication.
- bcrypt: Handles password hashing and comparison, ensuring that passwords are never stored in plain text.
- multer: Manages file uploads, such as employee images.
- path: Handles file path manipulations for secure file handling.

To run the backend: `npm start`

### Employee Endpoints:

- /employee_login: Handles employee login.
- /detail/:id: Retrieves detailed employee information.
- /logout: Logs out the employee by clearing cookies.

### Admin Endpoints:

- /adminlogin: Handles admin login.
- /department: Retrieves the list of departments.
- /add_department: Adds a new department.
- /add_employee: Adds a new employee.
- /employee: Retrieves the list of employees.
- /employee/:id: Retrieves detailed employee information.
- /edit_employee/:id: Edits an existing employee record.
- /delete_employee/:id: Deletes an employee record.
- /admin_count: Returns the total number of admins.
- /employee_count: Returns the total number of employees.
- /salary_count: Returns the total salary expenditure.
- /admin_records: Retrieves the list of admins.
- /admin_details/:id: Retrieves detailed admin information.
- /record_attendance: Records daily attendance.
- /attendance-list: Retrieves the list of attendance records.
- /logout: Logs out the admin by clearing cookies.

## Frontend Development

The frontend is built using React.js. It is designed to be responsive and user-friendly, ensuring that both admins and employees can easily navigate and use the system. The following modules are used:

- axios: For making HTTP requests to the backend API.
- bootstrap: For styling and responsive design.
- bootstrap-icons: For adding icons to the UI.
- react-router-dom: For managing routing within the application.

To run the frontend: `npm run dev`
