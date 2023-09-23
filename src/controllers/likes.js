const { Like } = require("../model");
const { NotFoundError } = require("../errors");

const getLike = async (req, res) => {
  try {
    const { commentId, userId } = req.params;

    const like = await Like.findOne({
      where: { comment_id: commentId, user_id: userId },
    });

    if (!like) {
      throw new NotFoundError("Like not found");
    }

    res.status(200).json({ like });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createLike = async (req, res) => {
  try {
    const { user_id, comment_id } = req.body;
    const like = await Like.create({ user_id, comment_id });
    res.status(201).json({ data: like, message: "Like created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const removeLike = async (req, res) => {
  try {
    const { user_id, comment_id } = req.body;
    const like = await Like.findOne({ where: { user_id, comment_id } });

    if (!like) {
      throw new NotFoundError("Like not found");
    }

    await like.destroy();

    res.status(200).json({ message: "Like removed successfully" });
  } catch (error) {
    console.error("Error:", error);

    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

module.exports = { createLike, removeLike, getLike };
