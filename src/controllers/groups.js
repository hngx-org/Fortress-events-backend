const { Group } = require("../model/index");

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
module.exports = {
  createGroup,
};
