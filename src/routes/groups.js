const express = require("express");
const router = express.Router();

// Import controller function to get group details
const { getAllGroups } = require("../controllers/groups");

// Get group details
router.get("/groups", getAllGroups);

module.exports = router;
