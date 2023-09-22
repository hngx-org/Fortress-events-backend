const express = require("express");
const { createLike, removeLike, getLike } = require("../controllers/likes");
const router = express.Router();

router.post("/comments/likes", createLike);
router.delete("/comments/likes", removeLike);
router.get("/comments/likes/:commentId/:userId", getLike);

module.exports = router;
