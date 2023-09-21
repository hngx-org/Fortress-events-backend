// commentController.js

const { NotFoundError } = require("../errors");
const sequelize = require("sequelize");
const { Comment, Image } = require("../model");

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

    // Send the image URL associated with the comment
    res.status(200).json({ imageUrl: comment.imageUrl });
  } catch (error) {
    console.error("Error retrieving image for comment:", error);

    // Send an error response
    res.status(500).json({ error: "Error retrieving image for comment" });
  }
}

module.exports = {
  addImageToComment,
  getImageForComment,
};
