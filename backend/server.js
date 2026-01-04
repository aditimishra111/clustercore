const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ---------- BASIC TEST ----------
app.get("/", (req, res) => {
  res.send("Backend running");
});

// ---------- ROUTES ----------
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/resume", require("./routes/resumeRoutes"));
// ⚠️ Gallery temporarily removed to avoid crash
app.use("/api/gallery", require("./routes/galleryRoutes"));

// ---------- DATABASE ----------
mongoose
  .connect("mongodb://127.0.0.1:27017/clustercore")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// ---------- SERVER ----------
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
