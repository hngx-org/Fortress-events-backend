const { Group } = require("../model/index");

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

module.exports = {
  updateGroup,
};
