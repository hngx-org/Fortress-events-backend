const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  updateSingleUserProfile,
  getUser,
} = require("../controllers/users");

router.route("/users/:id").put(updateSingleUserProfile).get(getUser);
router.route("/users").get(getAllUsers);

module.exports = router;
