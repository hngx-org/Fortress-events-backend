const {
  sendErrorResponse
} = require("../../utils/constants/response");

const errorHandler = (err, req, res, next) => {
  sendErrorResponse(
    res,
    statusCode = res.statusCode ? res.statusCode : 500,
    err.message
  );
  next()
};

module.exports = errorHandler;