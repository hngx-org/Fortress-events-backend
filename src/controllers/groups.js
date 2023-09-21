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
}const { Group } = require("../model");

const getGroups = async (req, res) => {
  try {
    const groups = await Group.findAll();

    return res.status(200).json({ groups });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createGroup = async (req, res) => {
  try {
    const { title, description } = req.body;

    const group = await Group.create({ title, description });

    return res.status(201).json({ group });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createGroup, getGroups };
