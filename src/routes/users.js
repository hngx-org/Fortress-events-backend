const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  updateSingleUserProfile,
  getUser,
  createUser,
} = require("../controllers/users");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for user management
 */

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user's profile by ID
 *     description: Use this endpoint to update a user's profile by their ID.
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define your user profile update properties here
 *     responses:
 *       '200':
 *         description: User profile updated successfully.
 *       '500':
 *         description: Internal server error.
 *
 *   get:
 *     summary: Get a user by ID
 *     description: Use this endpoint to retrieve a user by their ID.
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user.
 *     responses:
 *       '200':
 *         description: User retrieved successfully.
 *       '500':
 *         description: Internal server error.
 */
router.route("/users/:id").put(updateSingleUserProfile).get(getUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Use this endpoint to retrieve a list of all users.
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: Users retrieved successfully.
 *       '500':
 *         description: Internal server error.
 *
 *   post:
 *     summary: Create a new user
 *     description: Use this endpoint to create a new user.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               displayName:
 *                 type: string
 *                 description: The display name of the user.
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *               photoUrl:
 *                 type: string
 *                 description: The URL of the user's profile photo.
 *     responses:
 *       '200':
 *         description: User created successfully.
 *       '500':
 *         description: Internal server error.
 */
router.route("/users").get(getAllUsers).post(createUser);

router.get("/", (req, res) => {
  res.send("you've got the wrong route but TEAM FORTRESS API is WORKING!!!");
});

router.post("/login", (req, res) => {
  res.redirect("/users");
});

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Log out and destroy the session
 *     description: Use this endpoint to log out and destroy the user's session.
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: User logged out successfully.
 *       '500':
 *         description: Internal server error.
 */
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    console.log(req?.session?.user);
    return res.send("You've been logged out.");
  });
});

module.exports = router;
