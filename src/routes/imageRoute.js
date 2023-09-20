const express = require("express");
const router = express.Router();
const { addImageToComment } = require("../controller/imageController"); 
const {upload} = require("../config/multerConfig"); 


router.post("/comments/:commentId/images",upload.single("image"),addImageToComment);

module.exports = router;
