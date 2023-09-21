const { Group } = require("../model");

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
