const express = require("express");
const router = express.Router();
const {
  createEvent,
  getAllEvents,
  getSingeEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");

router.route("/events").get(getAllEvents).post(createEvent);

router
  .route("/events/:eventId")
  .get(getSingeEvent)
  .put(updateEvent)
  .delete(deleteEvent);

module.exports = router;
