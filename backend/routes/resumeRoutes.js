const express = require("express");
const router = express.Router();
const Resume = require("../models/Resume");

// SAVE resume
router.post("/save", async (req, res) => {
  try {
    const { studentId, data } = req.body;

    const resume = await Resume.findOneAndUpdate(
      { studentId },
      { ...data, studentId },
      { upsert: true, new: true }
    );

    res.json(resume);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET resume
router.get("/:studentId", async (req, res) => {
  try {
    const resume = await Resume.findOne({ studentId: req.params.studentId });
    res.json(resume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
