const {
    Group
} = require(`../../model/index.js`)
const {
    sendSuccessfulResponse
} = require(`../../utils/constants/response.js`);


//@route /api/groups
//@description create a new group
//@access private
const createGroup = async (req, res, next) => {
    try {
        const {
            title
        } = req.body
        //request validation
        if (!title || typeof title !== 'string') {
            res.status(400)
            throw new Error(`invalid request, title is required and must be a string`)
        }
        //create user group
        const data = await Group.create({
            title
        })
        return sendSuccessfulResponse(
            res, 201, data
        )
    } catch (error) {
        console.error(error);
        next(error)
    }
}

//@route /api/groups/:groupsId
//@description delete an existing group
//@access private
const deleteGroup = async (req, res, next) => {
    try {
        const {
            id
        } = req.params
        const existingGroup = await Group.findOne({
            where: {
                id: id
            }
        })
        if (!existingGroup) {
            res.status(404)
            throw new Error(`group does not exist`)
        }
        await Group.destroy({
            where: {
                id: id
            }
        })
        return sendSuccessfulResponse(
            res, 204, data='deleted successfully'
        )
    } catch (error) {
        next(error)
        console.error(error);
    }
}

module.exports = {
    createGroup,
    deleteGroup
}