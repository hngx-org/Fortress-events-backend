const express = require("express");
const router = express.Router();

// Import controller function to get group details
const { getGroupDetails, updateGroup } = require("../controllers/groups");

// Get group details
router.get("/groups/:groupId", getGroupDetails);
router.put("/groups/:groupId", updateGroup);

module.exports = router;
