const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../middlewares/isloggedin");
// router.use("/events", ensureAuthenticated);
const {
  createEvent,
  getAllEvents,
  getAllEventsPerUserId,
  getSingleEvent,
  updateEvent,
  deleteEvent,
  getNumUserFromEvent,
  getNumCommentForEvent,
} = require("../controllers/events");

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: API endpoints for events
 */

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Get all events
 *     description: Use this endpoint to retrieve a list of all events.
 *     tags: [Events]
 *     responses:
 *       '200':
 *         description: Events retrieved successfully.
 *       '500':
 *         description: Internal server error.
 *   post:
 *     summary: Create a new event
 *     description: Use this endpoint to create a new event.
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the event.
 *               description:
 *                 type: string
 *                 description: A description of the event.
 *               location:
 *                 type: string
 *                 description: The location of the event.
 *               creator_id:
 *                 type: string
 *                 description: The ID of the event creator.
 *               start_date:
 *                 type: string
 *                 description: The start date of the event.
 *                 format: date
 *               end_date:
 *                 type: string
 *                 description: The end date of the event.
 *                 format: date
 *               start_time:
 *                 type: string
 *                 description: The start time of the event.
 *                 format: time
 *               end_time:
 *                 type: string
 *                 description: The end time of the event.
 *                 format: time
 *     responses:
 *       '200':
 *         description: Event created successfully.
 *       '500':
 *         description: Internal server error.
 */
router.route("/events").get(getAllEvents).post(createEvent);

/**
 * @swagger
 * /api/events/{eventId}:
 *   get:
 *     summary: Get a single event by ID
 *     description: Use this endpoint to retrieve a single event by its ID.
 *     tags: [Events]
 *     parameters:
 *       - name: eventId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the event.
 *     responses:
 *       '200':
 *         description: Event retrieved successfully.
 *       '500':
 *         description: Internal server error.
 *
 *   put:
 *     summary: Update an event by ID
 *     description: Use this endpoint to update an event by its ID.
 *     tags: [Events]
 *     parameters:
 *       - name: eventId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the event.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define your event properties here
 *     responses:
 *       '200':
 *         description: Event updated successfully.
 *       '500':
 *         description: Internal server error.
 *
 *   delete:
 *     summary: Delete an event by ID
 *     description: Use this endpoint to delete an event by its ID.
 *     tags: [Events]
 *     parameters:
 *       - name: eventId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the event.
 *     responses:
 *       '200':
 *         description: Event deleted successfully.
 *       '500':
 *         description: Internal server error.
 */
router
  .route("/events/:eventId")
  .get(getSingleEvent)
  .put(updateEvent)
  .delete(deleteEvent);

/**
 * @swagger
 * /api/{userId}/events:
 *   get:
 *     summary: Get all events for a user
 *     description: Use this endpoint to retrieve all events associated with a user by their ID.
 *     tags: [Events]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user.
 *     responses:
 *       '200':
 *         description: Events retrieved successfully.
 *       '500':
 *         description: Internal server error.
 */
router.route("/:userId/events").get(getAllEventsPerUserId);

/**
 * @swagger
 * /api/{eventId}/users:
 *   get:
 *     summary: Get the number of users for an event
 *     description: Use this endpoint to retrieve the number of users participating in an event.
 *     tags: [Events]
 *     parameters:
 *       - name: eventId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the event.
 *     responses:
 *       '200':
 *         description: Number of users retrieved successfully.
 *       '500':
 *         description: Internal server error.
 */
router.route("/:eventId/users").get(getNumUserFromEvent);

/**
 * @swagger
 * /api/{eventId}/numcomment:
 *   get:
 *     summary: Get the number of comments for an event
 *     description: Use this endpoint to retrieve the number of comments associated with an event.
 *     tags: [Events]
 *     parameters:
 *       - name: eventId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the event.
 *     responses:
 *       '200':
 *         description: Number of comments retrieved successfully.
 *       '500':
 *         description: Internal server error.
 */
router.route("/:eventId/numcomment").get(getNumCommentForEvent);

module.exports = router;
