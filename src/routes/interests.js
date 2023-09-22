const express = require("express");
const router = express.Router();
const {
  expressInterest,
  getInterest,
  deleteInterest,
} = require("../controllers/comments");

router.route("/interest/:eventId").get(getInterest);

router
  .route("/users/:userId/interest/:eventId")
  .post(expressInterest)
  .delete(deleteInterest);

module.exports = router;
