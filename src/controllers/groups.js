const NotFoundError = require("../errors/not-found.js")
const {
    Group
} = require(`../model/index.js`)


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

module.exports={
    deleteGroup
}