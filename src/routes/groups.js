const express = require("express");
const router = express.Router();
const { deleteGroupMemberById } = require("../controllers/groups");

router.delete("/groupId/members/:id", deleteGroupMemberById)

// Import controller function to get group details
const { getGroupDetails } = require("../controllers/groups");

// Get group details
router.get("/groups/:groupId", getGroupDetails);

module.exports = router;
