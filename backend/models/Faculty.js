const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  facultyId: {
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

  department: {
    type: String,
    required: true
  },

  role: {
    type: String,
    default: "faculty"
  }
});

module.exports = mongoose.model("Faculty", facultySchema);
