const { Group } = require("../model/index");


const createGroup = async (req, res) => {
  try {

    const group = await Group.create({ ...req.body });
    return res
      .status(201)
      .json({ message: "Group successfully created", group });
  } catch (error) {
    console.error(error);

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
  createGroup,
  getAllGroups,
};
