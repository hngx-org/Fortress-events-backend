const express = require("express");
const router = express.Router();
const passport = require("../utils/passport");

router.get(
  "/login/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get("/login", (req, res) => {
  res.redirect("/auth/login/google");
});

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

module.exports = router;
