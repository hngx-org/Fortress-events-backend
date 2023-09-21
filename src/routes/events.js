const express = require("express");
const router = express.Router();
const {
  createEvent,
  getAllEvents,
  getSingeEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");

// import middlewares
const upload = require('../middlewares/multer');

router.post('/events', upload, createEvent )
router.route("/events").get(getAllEvents);


router
  .route("/events/:eventId")
  .get(getSingeEvent)
  .put(updateEvent)
  .delete(deleteEvent);

module.exports = router;
