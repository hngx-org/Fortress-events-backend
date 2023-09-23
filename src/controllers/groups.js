const { Group, User, Event, UserGroup, GroupEvent } = require("../model/index");
const { NotFoundError } = require("../errors");

const createGroup = async (req, res) => {
  try {
    const group = await Group.create({ ...req.body });
    return res
      .status(201)
      .json({ message: "Group successfully created", group });
  } catch (error) {
    console.error(`Error creating group: ${error}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    return res.status(200).json({ groups });
  } catch (error) {
    console.error(`Error fetching all groups: ${error}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getGroupDetails = async (req, res) => {
  const { groupId } = req.params;

  try {
    const group = await Group.findByPk(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    return res.status(200).json({ group });
  } catch (error) {
    console.error(`Error fetching group details: ${error}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const updateGroupDetails = async (req, res) => {
  const { groupId } = req.params;

  try {
    const group = await Group.findByPk(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    await group.update({ ...req.body });

    return res.status(200).json({ group });
  } catch (error) {
    console.error(`Error updating group details: ${error}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteGroup = async (req, res) => {
  const { groupId } = req.params;

  try {
    const group = await Group.findByPk(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    await group.destroy();

    return res.status(200).json({ group });
  } catch (error) {
    console.error(`Error deleting group: ${error}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteGroupMemberById = async (req, res) => {
  try {
    const { userId } = req.params;

    const deletedGroupMember = await UserGroup.destroy({
      where: {
        user_id: userId,
      },
    });

    if (!deletedGroupMember) {
      throw new NotFoundError("User not found");
    }

    return res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(`Error deleting group member: ${error}`);
    return res.status(404).json({ error: error.message });
  }
};

const getAllEventFromGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findByPk(groupId, {
      include: {
        model: Event,
        through: GroupEvent,
      },
    });
    return res.status(200).json({ group });
  } catch (error) {
    console.error(`Error fetching events from group: ${error}`);
    return res.status(500).json({ error: error.message });
  }
};

const getAllUserFromGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const users = await Group.findByPk(groupId, {
      include: {
        model: User,
        through: UserGroup,
      },
    });
    return res.status(200).json({ users });
  } catch (error) {
    console.error(`Error fetching users from group: ${error}`);
    return res.status(500).json({ error: error.message });
  }
};

const addUserToGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { user_id } = req.body;

    const group = await Group.findByPk(groupId);
    const user = await User.findByPk(user_id);

    if (!group || !user) {
      return res.status(400).json({ message: "Invalid group or user" });
    }

    const userGroup = await UserGroup.create({
      user_id,
      group_id: groupId,
    });

    return res.status(200).json({ userGroup });
  } catch (error) {
    console.error(`Error adding user to group: ${error}`);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createGroup,
  getAllGroups,
  getGroupDetails,
  updateGroupDetails,
  deleteGroup,
  deleteGroupMemberById,
  getAllEventFromGroup,
  getAllUserFromGroup,
  addUserToGroup,
};
