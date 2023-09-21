const express = require("express");
const router = express.Router();
const {createGroup, getAllGroups, getSingleGroup, updateGroup, deleteGroup} = require('../controllers/groups')

router.route('/groups').post(createGroup).get(getAllGroups)

router.route('/groups/:groupID')
.get(getSingleGroup)
.patch(updateGroup)
.delete(deleteGroup)

// Import controller function to get group details
const { getGroupDetails } = require('../controllers/groups');

// Get group details
router.get('/groups/:groupId', getGroupDetails);

module.exports = router;


