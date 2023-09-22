const { NotFoundError } = require("../errors");
const sequelize = require("sequelize");
const { Comment, CommentImage, Image } = require("../model");
const e = require("express");

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
};
