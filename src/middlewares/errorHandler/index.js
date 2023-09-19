const { sendErrorResponse } = require("../../utils/constants/response");

const errorHandler = (err, req, res, next) => {
  sendErrorResponse(res, 500, err);
};

module.exports = errorHandler;
