const { User } = require("../model");
const sequelize = require("sequelize");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  // Get userId from params
  const userId = req.params.id;

  try {
    // Query the db to find the user using its id
    const user = await User.findByPk(userId);

    // return 404 response if group does not exist
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    // If user exists, send success response
    return res.status(200).json({ user });
  } catch (error) {
    console.error(`error fetching group details: ${error}`);
  }
};

// updating a singleuser profile by id(pk)
const updateSignleUserProfile = async (req, res) => {
  try {
    const id = req.params.userId;
    const updateProfile = await User.findByPk(id);
    if (!updateProfile) {
      return res.status(404).json({ message: "User not found", status: 404 });
    }
    const { name, email, avatar } = req.body;
    updateProfile.name = name;
    updateProfile.email = email;
    updateProfile.avatar = avatar;
    await updateProfile.save();
    res.status(200).json({ updateProfile });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  updateSignleUserProfile,
  getUser,
};
