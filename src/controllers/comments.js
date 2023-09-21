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
  console.log("commentId", commentId);

  try {
    // Find the comment by ID
    const comment = await Comment.findByPk(commentId);
    console.log("comment", comment);

    if (!comment) {
      throw new NotFoundError("Comment not found");
    }

    // Now, let's find the associated image using a join operation
    const commentImage = await CommentImage.findOne({
      where: { commentId },
      include: [{ model: Image, as: "image" }],
    });

    // Check if commentImage is null or if the associated image is null
    if (!commentImage || !commentImage.image) {
      // Handle the case where no image is found
      res.status(404).json({ message: "No image found for this comment" });
      return; // Exit the function
    }

    // Access the image URL from the associated image
    const imageUrl = commentImage.image.imageUrl; // Adjust this based on your model structure

    // Send the image URL associated with the comment
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("Error retrieving image for comment:", error);

    if (error.message.includes("Image is not associated to CommentImage")) {
      // Handle the specific error message indicating that "Image is not associated with CommentImage."
      res
        .status(400)
        .json({ error: "Image is not associated with CommentImage" });
    } else {
      console.error("Error retrieving image for comment:", error);
      // Send an error response for other types of errors
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = {
  addImageToComment,
  getImageForComment,
};
