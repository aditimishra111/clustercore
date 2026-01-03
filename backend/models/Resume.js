const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  email: String,
  phone: String,
  skills: [String],
  education: String,
  projects: String
});

module.exports = mongoose.model("Resume", resumeSchema);
