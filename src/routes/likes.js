const express = require("express");
const { createLike, removeLike, getLike } = require("../controllers/likes");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: API endpoints for likes
 */

/**
 * @swagger
 * /comments/likes:
 *   post:
 *     summary: Create a new like for a comment
 *     description: Use this endpoint to create a new like for a comment.
 *     tags: [Likes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define your like properties here
 *     responses:
 *       '200':
 *         description: Like created successfully.
 *       '500':
 *         description: Internal server error.
 *
 *   delete:
 *     summary: Remove a like from a comment
 *     description: Use this endpoint to remove a like from a comment.
 *     tags: [Likes]
 *     responses:
 *       '200':
 *         description: Like removed successfully.
 *       '500':
 *         description: Internal server error.
 */
router.post("/comments/likes", createLike);
router.delete("/comments/likes", removeLike);

/**
 * @swagger
 * /comments/likes/{commentId}/{userId}:
 *   get:
 *     summary: Get a like for a comment by comment and user ID
 *     description: Use this endpoint to get a like for a comment by comment and user ID.
 *     tags: [Likes]
 *     parameters:
 *       - name: commentId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment.
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user.
 *     responses:
 *       '200':
 *         description: Like retrieved successfully.
 *       '500':
 *         description: Internal server error.
 */
router.get("/comments/likes/:commentId/:userId", getLike);

module.exports = router;
