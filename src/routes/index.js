const express = require('express')
/* importing controller functions */
const groupController = require(`../controller/groups/index.js`)

//express router
const router = express.Router()

//group routes
router.post(`/groups`, groupController.createGroup);
router.delete(`/groups/:id`, groupController.deleteGroup)

module.exports = router