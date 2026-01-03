const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running");
});

mongoose
  .connect("mongodb://127.0.0.1:27017/clustercore")
  .then(() => console.log("MongoDB CONNECTED"))
  .catch(err => console.log("MongoDB ERROR:", err));

app.use("/api/resume", require("./routes/resumeRoutes"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
