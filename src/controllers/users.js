const { User } = require("../model");
const session = require("express-session");
const { request } = require("express");

// create user from auth
const createUser = async (req, res) => {
  try {
    const { displayName, email, photoUrl } = req.body;

    if (!displayName || !email || !photoUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newuser = await User.findOrCreate({
      where: { email },
      defaults: {
        name: displayName,
        avatar: photoUrl,
      },
    });

    req.session.user = newuser[0];

    return res.status(201).json(newuser[0]);
  } catch (error) {
    console.error(`Error creating user: ${error}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json({ users });
  } catch (error) {
    console.error(`Error fetching all users: ${error}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getUser = async (req, res) => {
  // Get userId from params
  const { id } = req.params;

  try {
    // Query the db to find the user using its id
    const user = await User.findByPk(id);

    // Return 404 response if user does not exist
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // If user exists, send success response
    return res.status(200).json({ user });
  } catch (error) {
    console.error(`Error fetching user details: ${error}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Updating a single user profile by id (pk)
const updateSingleUserProfile = async (req, res) => {
  try {
    const id = req.params.userId;
    const updateProfile = await User.findByPk(id);

    if (!updateProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    const { name, email, avatar } = req.body;
    updateProfile.name = name;
    updateProfile.email = email;
    updateProfile.avatar = avatar;

    await updateProfile.save();

    return res.status(204).send(); // Use 204 for a successful update with no content
  } catch (error) {
    console.error(`Error updating user profile: ${error}`);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  updateSingleUserProfile,
  getUser,
  createUser,
};
