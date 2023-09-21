const { Group } = require("../model/index");

// get all groups
const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.status(200).json({ groups });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getAllGroups,
};
