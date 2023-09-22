const express = require("express");
const router = express.Router();
const {
  deleteEvent,
} = require("../controllers/events");


router
  .route("/events/:eventId")
  .delete(deleteEvent);

module.exports = router;