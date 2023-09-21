const { Group } = require('../model/index');

const getGroupDetails = async (req, res) => {
    // Get groupId from params
    const { groupId } = req.params;

    try {
        // Query the db to find the group using its id
        const group = await Group.findByPk(groupId);

        // return 404 response if group does not exist
        if (!group) {
            res.status(404).json({ message: 'Group not found' });
        }
        // If group exists, send success response
        return res.status(200).json({ group });
        
    } catch (error) {
        console.error(`error fetching group details: ${error}`);
    }
};

module.exports = {
    getGroupDetails,
}