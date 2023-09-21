const { Group } = require("../model/index");

// delete group
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
  deleteGroup,
};
