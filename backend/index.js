const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const cors = require("cors");

const app = express();

const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Server is Live");
});

app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Todo server is running on http://localhost:${PORT}`);
});
