const { Event, InterestedEvent, User } = require("../model");
const { Op } = require("sequelize");

const expressInterest = async (req, res) => {
  try {
    const { eventId, userId } = req.params;
    // Check if user is already interested in an event
    const existingInterest = await InterestedEvent.findOne({
      where: { user_id: userId, event_id: eventId },
    });
    if (existingInterest) {
      return res.status(403).json({ message: "Interest already exists" });
    }
    // Create interest in an event
    await InterestedEvent.create({ user_id: userId, event_id: eventId });
    return res.status(201).json({ message: "Interest created" });
  } catch (error) {
    console.error(`Error creating interest: ${error}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getInterest = async (req, res) => {
  try {
    const { eventId } = req.params;
    // Retrieve interests for an event
    const interests = await InterestedEvent.findAll({
      where: { event_id: eventId },
    });

    return res.status(200).json(interests);
  } catch (error) {
    console.error(`Error retrieving interests: ${error}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteInterest = async (req, res) => {
  try {
    const { eventId, userId } = req.params;
    await InterestedEvent.destroy({
      where: {
        // Use Sequelize's operators and logical operators to combine conditions
        [Op.and]: [{ user_id: userId }, { event_id: eventId }],
      },
    });

    return res.status(200).json({ message: "Interest deleted successfully" });
  } catch (error) {
    console.error(`Error deleting interest: ${error}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { expressInterest, getInterest, deleteInterest };
