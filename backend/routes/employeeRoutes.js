const express = require("express");
const router = express.Router();

const {
  addEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

router.post("/add-employee", addEmployee);
router.get("/employees", getEmployees);
router.put("/update-employee/:id", updateEmployee);
router.delete("/delete-employee/:id", deleteEmployee);

module.exports = router;