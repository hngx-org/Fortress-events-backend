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

// Use router.route for /api/comments/:commentId/images
router
  .route("/comments/:commentId/images")
  .post(upload.single("image"), addImageToComment)
  .get(getImageForComment);

//import controllers
const { getComment, addComment, getEventComment, updateComment, findCommentById } = require('../controllers/comments');


// Create a comment for an event
router.post('/events/:eventId/comments', addComment);

// Get comments for a specific event
router.get('/events/:eventId/comments', getEventComment);
router.get('/events/comments', getComment);
router.get('/events/comments/:commentId', findCommentById);


// Update a comment for an event
router.put('/comments/:commentId', updateComment);

module.exports = router;
