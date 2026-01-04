const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  eventId: {
    type: Number,
    required: true
  },

  photo: {
    type: String, // file path or image URL
    required: true
  },

  title: {
    type: String,
    required: true
  },

  body: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Gallery", gallerySchema);
