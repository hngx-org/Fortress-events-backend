const express = require("express");
const router = express.Router();
const {
  addImageToComment,
  getImageForComment,
  getComment,
  addComment,
  getEventComment,
  updateComment,
  findCommentById,
} = require("../controllers/comments");

// Use router.route for /api/comments/:commentId/images
router
  .route("/comments/:commentId/images")
  .post(addImageToComment)
  .get(getImageForComment);

// Define the routes individually
router.post("/events/:eventId/comments", addComment);
router.get("/events/:eventId/comments", getEventComment);
router.get("/events/comments", getComment);
router.get("/events/comments/:commentId", findCommentById);
router.put("/comments/:commentId", updateComment);

module.exports = router;
