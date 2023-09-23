const express = require("express");
const session = require("express-session");

//Middleware to check if the user is authenticated
const ensureAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect("/");
};

module.exports = ensureAuthenticated;
