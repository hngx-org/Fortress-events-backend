const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  addImageToComment,
  getImageForComment,
  addComment,
  getComment,
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

// Middleware for handling image uploads
router.post("/:commentId/images", upload.single("image"), addImageToComment);

// Middleware for getting images associated with a comment
router.get("/:commentId/images", getImageForComment);

// Route for adding a comment to an event
router.post("/events/:eventId/comments", addComment);

// Route for getting all comments for an event
router.get("/events/:eventId/comments", getComment);

module.exports = router;
