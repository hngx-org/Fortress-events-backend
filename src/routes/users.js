const express = require("express");
const router = express.Router();
const {getSingleUserProfile} = require('../controllers/users');

router.route('/users/:id').
get(getSingleUserProfile);


module.exports = router;
