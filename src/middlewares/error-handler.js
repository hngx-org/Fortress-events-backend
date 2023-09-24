const { CustomAPIError } = require("../errors/custom-api");
const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, please try again",
  };

  if (err.name === "SequelizeDatabaseError") {
    // Check for the specific error code
    if (err.parent.code === "ER_NO_REFERENCED_ROW") {
      customError.msg = "Foreign key constraint violation.";
    }
    customError.statusCode = 500; // You can set a different status code if needed
  }

  return res.status(customError.statusCode).json({ error: customError });
};

module.exports = errorHandlerMiddleware;
