const { NotFoundError } = require("../errors");
const { Event, Comment, CommentImage, Image } = require("../model");

// Add Comments
const addComment = async (req, res) => {
  const body = req.body.body;
  const eventId = req.params.eventId;
  const userId = req.body.user_id;
  const imageUrl = req.body.url;

  try {
    // Check if the event exists
    const eventExist = await Event.findByPk(eventId);
    if (!eventExist) {
      return res.status(404).json({ message: "Event not found" });
    }

    let image = null;

    // Check if an image URL is provided in the request body
    if (imageUrl) {
      // Create a new image record in the 'images' table
      image = await Image.create({ url: imageUrl });
    }

    // Create a new comment using the Comment model
    const newComment = await Comment.create({
      body,
      event_id: eventId,
      user_id: userId,
    });

    // Create a new CommentImage instance with specified attributes
    const commentImage = new CommentImage({
      comment_id: newComment.id,
      image_id: image ? image.id : null,
    });

    // Save the commentImage object to the database
    if (image) {
      await commentImage.save();
    }

    return res.status(201).json({
      message: "Comment created successfully",
      newComment,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get all comments with optional image URLs
const getComment = async (req, res) => {
  try {
    // Fetch all comments
    const comments = await Comment.findAll();

    // Create an array to store the formatted comments
    const formattedComments = [];

    // Iterate through each comment
    for (const comment of comments) {
      // Check if there's a matching CommentImage record
      const commentImage = await CommentImage.findOne({
        where: { comment_id: comment.id },
      });

      // Create a formatted comment object
      const formattedComment = {
        id: comment.id,
        body: comment.body,
      };

      // If a matching CommentImage record is found, fetch the associated image URL
      if (commentImage) {
        const image = await Image.findByPk(commentImage.image_id);
        if (image) {
          formattedComment.imageUrl = image.url;
        }
      }

      formattedComments.push(formattedComment);
    }

    return res.status(200).json(formattedComments);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single comment by comment ID with optional image URL
const findCommentById = async (req, res) => {
  const { commentId } = req.params;

  try {
    // Fetch the comment by ID
    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if there's a matching CommentImage record
    const commentImage = await CommentImage.findOne({
      where: { comment_id: comment.id },
    });

    // Create the formatted response
    const formattedComment = {
      id: comment.id,
      body: comment.body,
      // ... other comment properties you want to include
    };

    // If a matching CommentImage record is found, fetch the associated image URL
    if (commentImage) {
      const image = await Image.findByPk(commentImage.image_id);
      if (image) {
        formattedComment.imageUrl = image.url;
      }
    }

    return res.status(200).json({ comment: formattedComment });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get comments from an event by event ID with optional image URLs
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

    // Extract comments from the event
    const comments = event.Comments || [];

    // Create an array to store the formatted comments
    const formattedComments = [];

    // Iterate through each comment
    for (const comment of comments) {
      // Check if there's a matching CommentImage record
      const commentImage = await CommentImage.findOne({
        where: { comment_id: comment.id },
      });

      // Create the formatted comment object
      const formattedComment = {
        id: comment.id,
        body: comment.body,
        // ... other comment properties you want to include
      };

      // If a matching CommentImage record is found, fetch the associated image URL
      if (commentImage) {
        const image = await Image.findByPk(commentImage.image_id);
        if (image) {
          formattedComment.imageUrl = image.url;
        }
      }

      formattedComments.push(formattedComment);
    }

    return res.status(200).json(formattedComments);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const { body, imageUrl } = req.body;

    // Find the comment by ID
    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Get the existing userId from the comment
    const userId = comment.user_id;

    // Update the comment's body
    comment.body = body;

    // Explicitly set the userId to the existing userId
    comment.user_id = userId;

    await comment.save();

    // Check if an image URL is provided
    if (imageUrl) {
      let commentImage = await CommentImage.findOne({
        where: { comment_id: comment.id },
      });

      // Create a new image record if it doesn't exist
      if (!commentImage) {
        const image = await Image.create({ url: imageUrl });
        commentImage = await CommentImage.create({
          comment_id: comment.id,
          image_id: image.id,
        });
      } else {
        // Update the existing image record
        const image = await Image.findByPk(commentImage.image_id);
        if (image) {
          image.url = imageUrl;
          await image.save();
        }
      }
    }

    return res.status(200).json(comment);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

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
    res.status(201).json({ imageUrl });
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

module.exports = {
  addImageToComment,
  getImageForComment,
  getEventComment,
  addComment,
  getComment,
  updateComment,
  findCommentById,
};
