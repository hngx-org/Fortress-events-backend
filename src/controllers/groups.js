const sequelize = require("sequelize");
const { Group } = require("../model");
const { NotFoundError } = require("../errors");

//create event
const createGroup = async (req, res) => {
  try {
    // return res.send(req.body);
    const group = await Group.create({ ...req.body });
    return res
      .status(201)
      .json({ message: "Group successfully created", group });
  } catch (error) {
    console.error(error);
  }
};

// get all events
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

//get event by id
const getSingleGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findByPk(groupId);

    if (!group) {
      throw new NotFoundError("Group not found");
    }

    res.status(200).json({ group });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message });
  }
};

// update event

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
  createGroup,
  getAllGroups,
  getSingleGroup,
  updateGroup,
  deleteGroup,
};
