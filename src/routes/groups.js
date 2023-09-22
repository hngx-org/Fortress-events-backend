const express = require("express");
const router = express.Router();

// Import controller function to get group details
const {
  createGroup,
  getAllGroups,
  getGroupDetails,
  deleteGroupMemberById
} = require("../controllers/groups");

// Get group details
router.route("/groups").post(createGroup).get(getAllGroups);
router.route("/groups/:groupId").get(getGroupDetails);
router.route("/groupId/members/id").delete(deleteGroupMemberById);

module.exports = router;
