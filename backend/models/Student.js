const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true
  },

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true,
    minlength: 8
  },

  course: {
    type: String,
    required: true
  },

  year: {
    type: Number,
    required: true
  },

  branch: {
    type: String,
    required: true
  },

  session: {
    type: String,
    required: true
  },

  hostelAddress: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    unique: true
  },

  skill: {
    type: String
  },

  gender: {
    type: String,
    enum: ["male", "female", "other"]
  },

  role: {
    type: String,
    enum: ["student", "team member", "team lead"],
    default: "student"
  }
});

module.exports = mongoose.model("Student", studentSchema);
