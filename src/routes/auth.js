const express = require("express");
const router = express.Router();
const passport = require("../utils/passport");

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication
 */

/**
 * @swagger
 * /auth/login/google:
 *   get:
 *     summary: Login with Google
 *     description: Use this endpoint to initiate the Google OAuth login process.
 *     tags: [Authentication]
 *     responses:
 *       '200':
 *         description: Redirects to Google OAuth consent screen.
 *       '500':
 *         description: Internal server error.
 */

router.get(
  "/login/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

/**
 * @swagger
 * /auth/login:
 *   get:
 *     summary: Redirect to Google OAuth
 *     description: Use this endpoint to redirect to the Google OAuth login process.
 *     tags: [Authentication]
 *     responses:
 *       '200':
 *         description: Redirects to the Google OAuth consent screen.
 *       '500':
 *         description: Internal server error.
 */

router.get("/login", (req, res) => {
  res.redirect("/auth/login/google");
});

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     description: Use this endpoint to handle the Google OAuth callback after successful authentication.
 *     tags: [Authentication]
 *     responses:
 *       '200':
 *         description: Successful authentication and redirect to the home page.
 *       '500':
 *         description: Internal server error.
 */

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
