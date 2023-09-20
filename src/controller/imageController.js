const { Image, Comment } = require("../model/index"); 
const upload = require("../config/multerConfig"); 

async function addImageToComment(req, res) {
  try {
    const { commentId } = req.params;
    const { filename } = req.file;

    // Check if the comment exists
    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Create a new Image record in the database
    const image = await Image.create({
      comment_id: commentId,
      image_url: `/uploads/${filename}`, // Store the relative path to the image
    });

    return res.status(201).json(image);
  } catch (error) {
    console.error("Error adding image to comment:", error);
    return res.status(500).json({ error: "Unable to add image to comment" });
  }
}

module.exports = {
  addImageToComment,
};
