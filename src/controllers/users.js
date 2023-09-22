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
};
