const express = require("express");
const router = express.Router();
const Gallery = require("../models/Gallery");

// ADD GALLERY ITEM
router.post("/add", async (req, res) => {
  try {
    const galleryItem = await Gallery.create(req.body);
    res.json(galleryItem);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL GALLERY ITEMS
router.get("/", async (req, res) => {
  const items = await Gallery.find();
  res.json(items);
});

module.exports = router;
