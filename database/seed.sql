-- Add content to the department table
INSERT INTO department (id, name) VALUES 
(73, "Human Resources"),
(83, "Accounting"),
(39, "Marketing"),
(25, "Research and Development");


-- Add content to the role table
INSERT INTO role (id, title, salary, department_id) VALUES
(735923, "HR Manager", 78000.00, 73),
(836922, "Accountant", 67000.00, 83),
(394774, "Director of Marketing", 108000.00, 39),
(397252, "Marketing Analyst", 56000.00, 39),
(253263, "Director of Engineering", 152000.00, 25),
(258394, "Product Engineer", 92000.00, 25);


-- Add content to the employee table
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
(735923, "Timothy", "Williams", 731, NULL),
(836922, "Amber", "Smith", 835, NULL),
(394774, "Jamie", "Miller", 391, NULL),
(397252, "Andrew", "Phillips", 397, 394774),
(253263, "Laurel", "Davis", 251, NULL),
(258394, "Joseph", "Johnson", 253, 253263);
