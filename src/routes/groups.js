const express = require("express");
const router = express.Router();

// Import controller function to get group details
const {
  createGroup,
  getAllGroups,
  getGroupDetails,
  deleteGroup
} = require("../controllers/groups");

// Get group details
router.route("/groups").post(createGroup).get(getAllGroups);
router.route("/groups/:groupId").get(getGroupDetails);
router.route("/groups/:id").delete(deleteGroup)

module.exports = router;
