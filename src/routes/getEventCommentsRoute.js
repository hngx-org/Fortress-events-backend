const express = require("express");
const router = express.Router();
const {
  getCommentsByEvent,
  getAllComments,
} = require("../controller/getEventComments");

router.route("/events/comments").get(getAllComments);

router.route("/events/:eventId/comments").get(getCommentsByEvent);

module.exports = router;
