const express = require("express");
const router = express.Router();
const { updateSignleUserProfile } = require('../controllers/users')

router.route('/user/:id')
.put(updateSignleUserProfile)



module.exports = router;
