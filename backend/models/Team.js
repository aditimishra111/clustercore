const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  teamId: {
    type: String,
    required: true,
    unique: true
  },

  teamName: {
    type: String,
    required: true,
    enum: ["Technical", "Design", "Content"]
  },

  memberName: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["team member", "team lead"],
    required: true
  }
});

module.exports = mongoose.model("Team", teamSchema);
