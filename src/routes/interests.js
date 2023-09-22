const express = require("express");
const router = express.Router();
const {
  expressInterest,
  getInterest,
  deleteInterest,
} = require("../controllers/interests");

router.route("/interest/:eventId").get(getInterest);

router
  .route("/users/:userId/interest/:eventId")
  .post(expressInterest)
  .delete(deleteInterest);

module.exports = router;
