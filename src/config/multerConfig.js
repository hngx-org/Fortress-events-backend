const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/"); // Define the destination folder for uploaded images
  },
   filename: (req, file, cb) => {
    // Generate a unique filename for the image
    const uniqueFilename = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  },
});
//   filename: (req, file, callback) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
//     const ext = path.extname(file.originalname);
//     callback(null, file.fieldname + "-" + uniqueSuffix + ext);
//   },
// });

const upload = multer({ storage });

module.exports = { upload };