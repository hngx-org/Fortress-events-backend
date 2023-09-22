
const sequelize = require('sequelize');
const { NotFoundError } = require('../errors');
const { Event, Comment, CommentImage, Image } = require("../model");
const e = require("express");



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


// Function to add an image to a comment
async function addImageToComment(req, res) {
  const commentId = req.params.commentId;

  try {
    if (!req.file || !req.file.filename) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imageUrl = req.file.filename;
    // Create a new image record in the 'images' table
    const newImage = await Image.create({ url: imageUrl });

    // Update the comment to associate it with the new image
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      throw new NotFoundError("Comment not found");
    }

    comment.imageUrl = imageUrl;
    await comment.save();

    // Send a successful response
    res.status(201).json({ imageUrl: imageUrl });
  } catch (error) {
    console.error("Error adding image to comment:", error);

    if (error.name === "SequelizeUniqueConstraintError") {
      // Handle unique constraint violation error (e.g., duplicate image)
      res.status(400).json({ error: "Image already exists" });
    } else {
      // Handle other errors
      console.error("Error adding image to comment:", error);
      res.status(500).json({ error: "Error adding image to comment" });
    }
  }
}

// Function to retrieve an image associated with a comment
async function getImageForComment(req, res) {
  const commentId = req.params.commentId;

  try {
    // Find the comment by ID
    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      throw new NotFoundError("Comment not found");
    }

    // Check if the comment is associated with any images in the CommentImage table
    const commentImages = await CommentImage.findAll({
      attributes: { exclude: ["id"] }, // Exclude the 'id' field
      where: { comment_id: commentId }, // Filter by comment_id
    });

    if (!commentImages || commentImages.length === 0) {
      // Handle the case where no image is found
      return res
        .status(404)
        .json({ message: "No image found for this comment" });
    }

    // Extract the image IDs from the CommentImage records
    const imageIds = commentImages.map((commentImage) => commentImage.image_id);

    // Use the extracted image IDs to find the associated images
    const images = await Image.findAll({
      where: { id: imageIds }, // Find images with matching IDs
    });

    if (!images || images.length === 0) {
      // Handle the case where no images are found
      return res
        .status(404)
        .json({ message: "Images not found for this comment" });
    }

    // Access the image URLs from the associated images
    const imageUrls = images.map((image) => image.url);

    // Send the image URLs associated with the comment
    res.status(200).json({ imageUrls });
  } catch (error) {
    console.error("Error retrieving images for comment:", error);

    if (error.name === "NotFoundError") {
      // Handle the specific NotFoundError
      return res.status(404).json({ error: "Comment not found" });
    } else {
      console.error("Error retrieving images for comment:", error);
      // Send an error response for other types of error
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

// get all comments and get the image url if there is one

module.exports = {
  addImageToComment,
  getImageForComment,
  getEventComment,
    addComment,
    getComment,
    updateComment,
    findCommentById,
};

