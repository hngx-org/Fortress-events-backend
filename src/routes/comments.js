const express = require("express");
const router = express.Router();

//import controllers
const { getComment, addComment, getSingleComment, updateComment } = require('../controllers/comments');


// Create a comment for an event
router.post('/events/:eventId/comments', addComment);

// Get comments for a specific event
router.get('/events/:eventId/comments', getSingleComment);

//Get all comment
router.get('/events/:eventId/comments', getComment);

// Update a comment for an event
router.put('/comments/:commentId', updateComment);

module.exports = router;
