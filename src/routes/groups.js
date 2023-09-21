const express = require("express");
const router = express.Router();

// Import controller function to get group details
const { deleteGroup } = require("../controllers/groups");

// Get group details
router.delete("/groups/:groupId", deleteGroup);

module.exports = router;
