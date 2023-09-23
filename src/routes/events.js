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
} = require("../controllers/events");

router.route("/events").get(getAllEvents).post(createEvent);

router
  .route("/events/:eventId")
  .get(getSingleEvent)
  .put(updateEvent)
  .delete(deleteEvent);

router.route("/:userId/events").get(getAllEventsPerUserId);
module.exports = router;
