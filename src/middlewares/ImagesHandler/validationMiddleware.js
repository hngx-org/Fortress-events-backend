const validator = require("validator");

// Middleware for validating image URLs
const validateImageUrl = (req, res, next) => {
  const { imageUrl } = req.body;

  if (!validator.isURL(imageUrl)) {
      return res.status(400).json({ error: "Invalid image URL" });
  }
  next();
};

module.exports = {
  validateImageUrl,
};
