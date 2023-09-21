const express = require("express");
const router = express.Router();

//import controllers
const { getComment, addComment, getEventComment, updateComment, findCommentById } = require('../controllers/comments');


// Create a comment for an event
router.post('/events/:eventId/comments', addComment);

// Get comments for a specific event
router.get('/events/:eventId/comments', getEventComment);
router.get('/events/comments', getComment);
router.get('/events/comments/:commentId', findCommentById);


// Update a comment for an event
router.put('/comments/:commentId', updateComment);

module.exports = router;
