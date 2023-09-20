const express = require('express')
/* importing controller functions */
const groupController = require(`../controller/groups/index.js`)

//express router
const router = express.Router()

//group routes
//create group
router.post(`/groups`, groupController.createGroup);
//delete group by id
router.delete(`/groups/:id`, groupController.deleteGroup)

module.exports = router