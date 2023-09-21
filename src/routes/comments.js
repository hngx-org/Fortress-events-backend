// commentRoutes.js

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  addImageToComment,
  getImageForComment,
} = require("../controllers/comments");

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads/"));
  },
  filename: (req, file, cb) => {
    const uniqueFilename = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage });

// POST /api/comments/:commentId/images
router.post("/:commentId/images", upload.single("image"), addImageToComment);

// GET /api/comments/:commentId/images
router.get("/:commentId/images", getImageForComment);

module.exports = router;
