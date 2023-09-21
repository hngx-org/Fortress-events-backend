const express = require("express");
const router = express.Router();
const { addImageToComment } = require("../controllers/images");
const { upload } = require("../config/multerConfig");
// const {validateImageUrl} = require("../middlewares/ImagesHandler/validationMiddleware");
router.post(
  "/comments/:commentId/images",
    upload.single("image"),
    // validateImageUrl,
    addImageToComment
);

module.exports = router;



