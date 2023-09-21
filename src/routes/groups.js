const express = require("express");
const router = express.Router();

// Import controller function to get group details
const { createGroup } = require("../controllers/groups");

// Get group details
router.post("/groups", createGroup);

module.exports = router;
