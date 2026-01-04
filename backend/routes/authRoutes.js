const express = require("express");
const router = express.Router();
const Student = require("../models/Student"); // ✅ correct model

console.log("authRoutes loaded");

// ================= REGISTER STUDENT =================
router.post("/register", async (req, res) => {
  try {
    const { studentId, name, email, password } = req.body;

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists" });
    }

    const student = await Student.create({
      studentId,
      name,
      email,
      password
    });

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ================= LOGIN STUDENT =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (student.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.json({
      message: "Login successful",
      studentId: student.studentId,
      mongoId: student._id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ================= UPDATE STUDENT PROFILE =================
router.put("/update/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ================= TEST ROUTE =================
router.get("/test", (req, res) => {
  res.send("AUTH ROUTE WORKING");
});

module.exports = router;
