const express = require("express");
const router = express.Router();

// Import controller function to get group details
const { getGroupDetails } = require('../controllers/groups');

// Get group details
router.get('/groups/:groupId', getGroupDetails);

module.exports = router;
