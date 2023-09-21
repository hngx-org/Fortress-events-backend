const { User } = require("../model/index");
const sequelize = require("sequelize");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllUsers };
