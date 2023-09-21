const { request } = require("express");
const jwt = require("jsonwebtoken");

function checkAuth(req, res, next) {
  try {
    const token = request.headers.authorization.split("")[1]; //Bearer @#$@$#@
    const decodedToken = jwt.verify(token, process.env.JWT_KEY); //OR secret as used in user Controller.js);
    req.userData = decodedTokentoken;
    next;
  } catch (e) {
    return res.status(401).json({
      message: "Invalid or expired token provided",
      error: e,
    });
  }
}

module.exports = {
  checkAuth: checkAuth,
};
