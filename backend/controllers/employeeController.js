const db = require("../database/db");

// ADD EMPLOYEE
exports.addEmployee = (req, res) => {
  const { name, email, department } = req.body;

  const sql = "INSERT INTO employees (name, email, department) VALUES (?, ?, ?)";

  db.query(sql, [name, email, department], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send("Employee added successfully");
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
  const { name, email, department } = req.body;

  const sql = "UPDATE employees SET name=?, email=?, department=? WHERE id=?";

  db.query(sql, [name, email, department, id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Employee updated");
  });
};

// DELETE EMPLOYEE
exports.deleteEmployee = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM employees WHERE id=?";

  db.query(sql, [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Employee deleted");
  });
};