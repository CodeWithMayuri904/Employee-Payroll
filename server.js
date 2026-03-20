const express = require("express");
const cors = require("cors");

const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", employeeRoutes);

app.get("/", (req, res) => {
  res.send("Payroll API Running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});