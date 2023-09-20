const express = require("express");
const router = express.Router();

// Import other route modules
const commentsRouter = require("./comments"); // Import the comments router

// Mount the comments router under /api/comments
router.use("/api/comments", commentsRouter);

module.exports = router;
