const sequelize = require('sequelize');
const { Event, Comment } = require('../model');
const { NotFoundError } = require('../errors');



// add Comments
const addComment = async (req, res) => {
    const { eventId } = req.params;
    // note: the usedId should come from the auth middleware
    const { body, userId } = req.body; // seems the db is rejecting hardcoded values, so you should pass the userId from the req body

    // Check if the event exists
    const eventExist = await Event.findOne({
        where: { id: eventId },
    });

    if (!eventExist) {
        return res.status(404).json({ message: "Event not found" });
    }

    try {
        // Create a new comment using the Comment model
        const newComment = await Comment.create({
            body,
            user_id: userId,
            event_id: eventId,
        });

        return res.status(201).json({
            message: "Comment created successfully",
            newComment
        });
    } catch (error) {
        console.error(error.message);
        console.error(error.stack);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


//Get all comments 
const getComment = async (req, res) => {
    try {
        const comments = await Comment.findAll()
        return res.status(200).json(comments)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

// get a single comment with comments id
const findCommentById = async (req, res) => {
    const { commentId } = req.params;
    const comment = await Comment.findOne({
        where: {id : commentId}
    });
    if (!comment) {
        return res.status(404).send("No such comment")
    };
    return res.status(200).json({
        comment
    })
}


// Get comment from an event by Id
const getEventComment = async (req, res) => {
    try {
        const eventId = req.params.eventId;

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
    getEventComment,
    addComment,
    getComment,
    updateComment,
    findCommentById,
};