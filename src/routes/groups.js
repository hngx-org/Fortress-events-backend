const express = require("express");
const router = express.Router();

// Import controller function to get group details
const { updateGroup } = require("../controllers/groups");

// Get group details

router.put("/groups/:groupId", updateGroup);

module.exports = router;
