const express = require("express");
const router = express.Router();

// Import controller function to get group details
const { getGroupDetails, createGroup } = require('../controllers/groups');

// Get group details
router.post('/groups', createGroup);
router.get('/groups/:groupId', getGroupDetails);

module.exports = router;
