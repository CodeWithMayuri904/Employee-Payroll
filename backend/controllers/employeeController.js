// const db = require("../database/db");

// // ADD EMPLOYEE
// exports.addEmployee = (req, res) => {
//   const { name, email, department, salary } = req.body;

//   const sql = "INSERT INTO employees (name, email, department, salary) VALUES (?, ?, ?, ?)";

//   db.query(sql, [name, email, department, salary], (err, result) => {
//     if (err) return res.status(500).send(err);
//     // res.send("Employee added successfully");
//     res.json({ id: result.insertId, name, email, department, salary });
//   });
// };

// // GET ALL EMPLOYEES
// exports.getEmployees = (req, res) => {
//   const sql = "SELECT * FROM employees";

//   db.query(sql, (err, result) => {
//     if (err) return res.status(500).send(err);
//     res.json(result);
//   });
// };

// // UPDATE EMPLOYEE
// exports.updateEmployee = (req, res) => {
//   const { id } = req.params;
//   const { name, email, department, salary } = req.body;

//   const sql = "UPDATE employees SET name=?, email=?, department=?, salary=? WHERE id=?";

//   db.query(sql, [name, email, department, salary, id], (err) => {
//     if (err) return res.status(500).send(err);
//     // res.send("Employee updated");
//     res.json({ id, name, email, department, salary });
//   });
// };

// // DELETE EMPLOYEE
// exports.deleteEmployee = (req, res) => {
//   const { id } = req.params;

//   const sql = "DELETE FROM employees WHERE id=?";

//   db.query(sql, [id], (err) => {
//     if (err) return res.status(500).send(err);
//     res.send("Employee deleted");
//   });
// };

const db = require("../database/db");

// ADD EMPLOYEE
// exports.addEmployee = (req, res) => {
//   const { name, email, department, salary } = req.body;

//   const sql = "INSERT INTO employees (name, email, department, salary) VALUES (?, ?, ?, ?)";

//   db.query(sql, [name, email, department, salary], (err, result) => {
//     if (err) return res.status(500).send(err);

//     // Send back the inserted employee as JSON
//     res.json({ id: result.insertId, name, email, department, salary });
//   });
// };
// employeeController.js

exports.addEmployee = (req, res) => {
  const { name, email, department, salary } = req.body;

  // Convert salary to number
  const salaryNumber = salary ? parseFloat(salary) : 0;

  const sql = "INSERT INTO employees (name, email, department, salary) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, email, department, salaryNumber], (err, result) => {
    if (err) return res.status(500).send(err);

    // Send back employee object with proper salary
    res.json({ id: result.insertId, name, email, department, salary: salaryNumber });
  });
};


// GET ALL EMPLOYEES
exports.getEmployees = (req, res) => {
  const sql = "SELECT * FROM employees";

  db.query(sql, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};

// UPDATE EMPLOYEE
exports.updateEmployee = (req, res) => {
  const { id } = req.params;
  const { name, email, department, salary } = req.body;

  const sql = "UPDATE employees SET name=?, email=?, department=?, salary=? WHERE id=?";

  db.query(sql, [name, email, department, salary, id], (err) => {
    if (err) return res.status(500).send(err);

    // Return the updated employee as JSON
    res.json({ id, name, email, department, salary });
  });
};

// DELETE EMPLOYEE
exports.deleteEmployee = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM employees WHERE id=?";

  db.query(sql, [id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Employee deleted successfully", id });
  });
};