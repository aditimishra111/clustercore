const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// UPDATE student profile
router.put("/update/:studentId", async (req, res) => {
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { studentId: req.params.studentId }, // kis student ko update karna
      req.body,                             // kya update karna
      { new: true, upsert: true }           // new data return + create if not exists
    );

    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
