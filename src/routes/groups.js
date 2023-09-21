const express = require("express");
const router = express.Router();
const {createGroup, getAllGroups} = require('../controllers/groups')

router.route('/').post(createGroup).get(getAllGroups)

module.exports = router;


