const express = require("express");
const router = express.Router();
const {createGroup, getAllGroups, getSingleGroup, updateGroup, deleteGroup} = require('../controllers/groups')

router.route('/groups').post(createGroup).get(getAllGroups)

router.route('/groups/:groupID')
.get(getSingleGroup)
.patch(updateGroup)
.delete(deleteGroup)

module.exports = router;


