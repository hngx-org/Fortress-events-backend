const express = require('express');
const router = express.Router();

// import middlewares
const upload = require('../middlewares/multer/index');

// import controllers
const { createEvent } = require('../controllers/events');


// post request
router.post('/', upload, createEvent);



module.exports = router;