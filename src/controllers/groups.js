const { Group } = require("../model/index");

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

// update group
const updateGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.update(
      { ...req.body },
      { where: { id: groupId } }
    );

    if (!group) {
      throw new NotFoundError("Event not found");
    }

    res.status(200).json({ message: "Group successfully updated", group });
  } catch (error) {
    console.error(error);
  }
};

const deleteGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.destroy({ where: { id: groupId } });

    if (!group) {
      throw new NotFoundError("Group not found");
    }

    res.status(200).json({ message: "Group deleted successfully", group });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getGroupDetails,
  updateGroup,
  deleteGroup,
};
