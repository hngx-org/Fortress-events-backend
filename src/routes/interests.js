const express = require("express");
const router = express.Router();
const {
  expressInterest,
  getInterest,
  deleteInterest,
} = require("../controllers/interests");

/**
 * @swagger
 * tags:
 *   name: Interests
 *   description: API endpoints for interests
 */

/**
 * @swagger
 * /api/interest/{eventId}:
 *   get:
 *     summary: Get interests for an event
 *     description: Use this endpoint to retrieve interests for a specific event.
 *     tags: [Interests]
 *     parameters:
 *       - name: eventId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the event.
 *     responses:
 *       '200':
 *         description: Interests retrieved successfully.
 *       '500':
 *         description: Internal server error.
 */
router.route("/interest/:eventId").get(getInterest);

/**
 * @swagger
 * /api/users/{userId}/interest/{eventId}:
 *   post:
 *     summary: Express interest in an event
 *     description: Use this endpoint to express interest in a specific event as a user.
 *     tags: [Interests]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user.
 *       - name: eventId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the event.
 *     responses:
 *       '200':
 *         description: Interest expressed successfully.
 *       '500':
 *         description: Internal server error.
 *
 *   delete:
 *     summary: Remove interest in an event
 *     description: Use this endpoint to remove your interest in a specific event as a user.
 *     tags: [Interests]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user.
 *       - name: eventId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the event.
 *     responses:
 *       '200':
 *         description: Interest removed successfully.
 *       '500':
 *         description: Internal server error.
 */

router
  .route("/users/:userId/interest/:eventId")
  .post(expressInterest)
  .delete(deleteInterest);

module.exports = router;
