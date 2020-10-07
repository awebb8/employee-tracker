INSERT INTO department (dept_name) VALUES 
("Human Resources"),
("Accounting"),
("Marketing"),
("Research and Development");

-- Add content to the role table
INSERT INTO role (title, salary, department_id) VALUES
("HR Manager", 78000.00, 1),
("Accountant", 67000.00, 2),
("Director of Marketing", 108000.00, 3),
("Marketing Analyst", 56000.00, 3),
("Director of Engineering", 152000.00, 4),
("Product Engineer", 92000.00, 4);

-- Add content to the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
("Timothy", "Williams", 1, NULL),
("Amber", "Smith", 2, NULL),
("Jamie", "Miller", 3, NULL),
("Andrew", "Phillips", 4, 3),
("Laurel", "Davis", 5, NULL),
("Joseph", "Johnson", 6, 5);
