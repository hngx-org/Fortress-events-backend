const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// Upload file buffer to Cloudinary
const cloudUpload = async function (fileBuffer) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.secure_url || result.url);
      }
    });

    // Create a readable stream from the file buffer
    const bufferStream = streamifier.createReadStream(fileBuffer);

    // Pipe the buffer stream to the upload stream
    bufferStream.pipe(uploadStream);
  });
};



  

module.exports = cloudUpload;