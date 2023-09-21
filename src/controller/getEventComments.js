const sequelize = require("sequelize");
const { Comment } = require("../model/index"); // Import Comment using curly braces

exports.getCommentsByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    // Query the database to retrieve comments for the specified event
    const comments = await Comment.findAll({
      where: { event_id: eventId },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!comments || comments.length === 0)
      return res.status(404).json({ error: `No comments found at ${eventId}` });
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.status(200).json({ comments });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message });
  }
};
