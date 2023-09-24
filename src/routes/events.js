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

router.route("/events").get(getAllEvents).post(createEvent);

router
  .route("/events/:eventId")
  .get(getSingleEvent)
  .put(updateEvent)
  .delete(deleteEvent);

router.route("/:userId/events").get(getAllEventsPerUserId);
router.route("/:eventId/users").get(getNumUserFromEvent);
router.route("/:eventId/numcomment").get(getNumCommentForEvent);
module.exports = router;
