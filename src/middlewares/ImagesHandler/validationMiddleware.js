const validator = require("validator");
const { sendErrorResponse } = require("../utils/constants/response");

// Middleware for validating image URLs
const validateImageUrl = (req, res, next) => {
  const { imageUrl } = req.body;

  if (!validator.isURL(imageUrl)) {
    return sendErrorResponse(res, 400, "Invalid image URL");
  }

  next();
};

module.exports = {
  validateImageUrl,
};
