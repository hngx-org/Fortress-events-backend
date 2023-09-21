const express = require("express");
const router = express.Router();
const Events = require('../controllers/events')

router.get('/events', Events.getAllEvents)

module.exports = router;
