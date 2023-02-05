INSERT INTO departments (name)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Sales");

INSERT INTO roles(title, department_id, salary)
VALUES ("Sales Lead", 4, 100000),
       ("Salesperson", 4, 80000),
       ("Lead Engineer", 1, 150000),
       ("Software Engineer", 1, 120000),
       ("Account Manager", 2, 160000),
       ("Accountant", 2, 125000),
       ("Legal Team Lead", 3, 250000),
       ("Lawyer", 3, 190000);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe",  1, NULL ),
       ("Mike", "Chan",  2, 1),
       ("Rufat", "Eskendarov", 3, NULL),
       ("Kevin", "Tupik", 4, 3),
       ("Kunal", "Singh", 5, NULL),
       ("Malia", "Brown", 6, 5),
       ("Sarah", "Lourd", 7, NULL),
       ("Tom", "Allen", 8, 7);



       SELECT e.id,e.first_name, e.last_name, title, name AS department, salary, CONCAT(m.first_name," ", m.last_name) AS manager
FROM   employees e
LEFT JOIN   employees m on e.manager_id = m.id
INNER JOIN roles
on e.role_id = roles.id
Inner join departments
on roles.department_id = departments.id
ORDER BY e.id ASC;