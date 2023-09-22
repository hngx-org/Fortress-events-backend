const { Group } = require("../model/index");

const createGroup = async (req, res) => {
  try {
    const group = await Group.create({ ...req.body });
    return res
      .status(201)
      .json({ message: "Group successfully created", group });
  } catch (error) {
    console.error(error);
  }
};

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

const getGroupDetails = async (req, res) => {
  // Get groupId from params
  const { groupId } = req.params;

  try {
    // Query the db to find the group using its id
    const group = await Group.findByPk(groupId);

    // return 404 response if group does not exist
    if (!group) {
      res.status(404).json({ message: "Group not found" });
    }
    // If group exists, send success response
    return res.status(200).json({ group });
  } catch (error) {
    console.error(`error fetching group details: ${error}`);
  }
};

module.exports = {
  createGroup,
  getAllGroups,
  getGroupDetails,
};
