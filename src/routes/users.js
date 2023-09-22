const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  updateSignleUserProfile,
} = require("../controllers/users");

router.route("/users/:id").put(updateSignleUserProfile);
router.route("/users").get(getAllUsers);

module.exports = router;
