const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  updateSignleUserProfile,
  getUser,
} = require("../controllers/users");

router.route("/users/:id").put(updateSignleUserProfile).get(getUser);
router.route("/users").get(getAllUsers);

module.exports = router;
