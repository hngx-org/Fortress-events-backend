const sequelize = require('sequelize');
const { Event, Comment } = require('../model');
const { NotFoundError } = require('../errors');



// add Comments
const addComment = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        // the user_id should come from a middleware
        const { body, user_id } = req.body;

        const eventExist = await Event.findOne({
            where: { id: id },
        });

        if (!eventExist) {
            throw new NotFoundError("Event not found");
        }

        // Create a new comment using the Comment model
        const newComment = await Comment.create({
            body,
            user_id,
            event_id: eventId,
        });

        return res.status(201).json({
            message: "comment created successfully",
            newComment
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

//Get comment 
const getComment = async (req, res) => {
    try {
        const comments = await Comment.findAll()
        return res.status(200).json(comments)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
}
}

// Get comments from an event by Id
const getSingleComment = async (req, res) => {
    try {
        const eventId = req.params;

        // Find the event by ID and include associated comments
        const event = await Event.findByPk(eventId, {
            include: Comment,
        });

        if (!event) {
            throw new NotFoundError("Event not found");
        }
        return res.status(200).json(event.Comments);

    } catch (error) {
        console.error(error);
        return res.status(404).json({ message: error.message });
    }
};

const updateComment = async (req, res) => {
    try {
      const commentId = req.params.commentId;
      const { body } = req.body;
  
      // Find the comment by ID
      const comment = await Comment.findByPk(commentId);
  
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
  
      // Update the comment's body
      comment.body = body;
      await comment.save();
  
      return res.status(200).json(comment);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

module.exports = {
    getSingleComment,
    addComment,
    getComment,
    updateComment
};