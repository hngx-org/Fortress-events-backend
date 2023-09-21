const express = require("express");
const router = express.Router();
const { Comment} = require('../model')

// create a comment
// router.post('/events/:eventId/comments', async (req, res)=> {
//     const Comment = new Comment ({
//         ...req.body
//     });
//     try {
//         const userComment = await Comment.save()
//         res.status(201).json(userComment)
//     } catch (error) {
//         res.status(404).json({message: error})
//     }
// });

// Create a comment for an event
router.post('/events/:eventId/comments', async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const { body, user_id } = req.body;

    // Create a new comment using the Comment model
    const newComment = await Comment.create({
      body,
      user_id,
      event_id: eventId,
    });

    return res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});



 
  // Get comments for a specific event
    router.get('/events/:eventId/comments', async (req, res) => {
    try {
      const eventId = req.params.eventId;
  
      // Find the event by ID and include associated comments
      const event = await Event.findByPk(eventId, {
        include: Comment,
      });
  
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      return res.status(200).json(event.Comments);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Update a comment for an event
//     router.put('/comments/:commentId', async (req, res) => {
//     try {
//       const commentId = req.params.commentId;
//       const { body } = req.body;
  
//       // Find the comment by ID
//       const comment = await Comment.findByPk(commentId);
  
//       if (!comment) {
//         return res.status(404).json({ message: 'Comment not found' });
//       }
  
//       // Update the comment's body
//       comment.body = body;
//       await comment.save();
  
//       return res.status(200).json(comment);
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//   });
  
module.exports = router;
