const express = require("express");
const router = express.Router();

// Import controller function to get group details
const { createGroup, getAllGroups } = require("../controllers/groups");

// Get group details
router.route("/groups").post(createGroup).get(getAllGroups);

module.exports = router;
