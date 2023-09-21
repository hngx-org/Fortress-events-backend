const NotFoundError = require("../errors/not-found.js")
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
    //@route /api/groups/groupId
//@desc Delete  an existing group
//@access private
const deleteGroup = async (req, res, next) => {
    try {
        const {
            id
        } = req.params
        /* check if the group exist */
        const isGroupExisting = await Group.findOne({
            where: {
                id: id
            }
        })
        if (!isGroupExisting) {
            throw new NotFoundError(`Group not found`)
        } else {
            await Group.destroy({
                where: {
                    id: id
                }
            })
            return res.status(204).json({
                message: `group has been deleted successfully`
            })
        }
    } catch (error) {
        console.error(error);
        next(error)
    }
}

module.exports = {
  createGroup,
  getAllGroups,
  deleteGroup
};