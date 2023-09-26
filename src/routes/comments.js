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

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API endpoints for comments
 */

/**
 * @swagger
 * /api/comments/{commentId}/images:
 *   post:
 *     summary: Add an image to a comment
 *     description: Use this endpoint to add an image to a comment.
 *     tags: [Comments]
 *     parameters:
 *       - name: commentId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Image added successfully.
 *       '500':
 *         description: Internal server error.
 */
router
  .route("/comments/:commentId/images")
  .post(addImageToComment)
  .get(getImageForComment);

/**
 * @swagger
 * /api/events/{eventId}/comments:
 *   post:
 *     summary: Add a new comment to an event
 *     description: Use this endpoint to add a new comment to an event.
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               body:
 *                 type: string
 *                 description: The body text of the comment.
 *               eventId:
 *                 type: string
 *                 description: The ID of the event to which the comment is added.
 *               userId:
 *                 type: string
 *                 description: The ID of the user adding the comment.
 *               imageUrl:
 *                 type: string
 *                 description: (Optional) URL of an image associated with the comment.
 *     responses:
 *       '201':
 *         description: Comment created successfully.
 *       '404':
 *         description: Event not found.
 *       '500':
 *         description: Internal server error.
 */

router.post("/events/:eventId/comments", addComment);

/**
 * @swagger
 * /api/events/{eventId}/comments:
 *   get:
 *     summary: Get all comments for an event
 *     description: Use this endpoint to get all comments for a specific event.
 *     tags: [Comments]
 *     parameters:
 *       - name: eventId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the event.
 *     responses:
 *       '200':
 *         description: Comments retrieved successfully.
 *       '500':
 *         description: Internal server error.
 */
router.get("/events/:eventId/comments", getEventComment);

/**
 * @swagger
 * /api/events/comments:
 *   get:
 *     summary: Get all comments
 *     description: Use this endpoint to get all comments.
 *     tags: [Comments]
 *     responses:
 *       '200':
 *         description: Comments retrieved successfully.
 *       '500':
 *         description: Internal server error.
 */
router.get("/events/comments", getComment);

/**
 * @swagger
 * /api/events/comments/{commentId}:
 *   get:
 *     summary: Get a comment by ID
 *     description: Use this endpoint to get a comment by its ID.
 *     tags: [Comments]
 *     parameters:
 *       - name: commentId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment.
 *     responses:
 *       '200':
 *         description: Comment retrieved successfully.
 *       '500':
 *         description: Internal server error.
 */
router.get("/events/comments/:commentId", findCommentById);

/**
 * @swagger
 * /api/events/comments/{commentId}:
 *   put:
 *     summary: Update a comment by ID
 *     description: Use this endpoint to update a comment by its ID.
 *     tags: [Comments]
 *     parameters:
 *       - name: commentId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment.
 *     responses:
 *       '200':
 *         description: Comment updated successfully.
 *       '500':
 *         description: Internal server error.
 */
router.put("/comments/:commentId", updateComment);

module.exports = router;
