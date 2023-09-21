const express = require("express");
const router = express.Router();
const {getSingleUserProfile} = require('../controllers/users');

router.route('/user/profile/:id').
get(getSingleUserProfile);


module.exports = router;
