const sequelize = require("sequelize");
const { Group } = require("../model");
const { NotFoundError } = require("../errors");

const deleteGroupMemberById = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedGroupMember = await Group.destroy({
      where: {
        id: userId,
      },
    });

    if (!deletedGroupMember) {
      throw new NotFoundError("User not found");
    }

    res.statuscode(200).json({
      status: `success`,
      message: `User deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: 500 });
  }
};

module.exports = {
  deleteGroupMemberById,
};
