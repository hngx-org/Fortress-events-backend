const sequelize = require("sequelize");
const { Event, InterestedEvent, User } = require("../model");
const { NotFoundError } = require("../errors");
const { Op } = require("sequelize");

const expressInterest = async (req, res) => {
  try {
    const { eventId, userId } = req.params;
    //check if user is already interested in an event
    const existingInterest = await InterestedEvent.findOne({
      where: { user_id: userId, event_id: eventId },
    });
    if (existingInterest) {
      throw new NotFoundError("User is already interested in this event");
    }
    //create interest in an event
    await InterestedEvent.create({ user_id: userId, event_id: eventId });
    return res.status(201).json({ message: "Interest created" });
  } catch (error) {
    console.log(error);
  }
};

const getInterest = async (req, res) => {
  try {
    const { eventId } = req.params;
    //check if user is already interested in an event
    const interests = await InterestedEvent.findAll({
      where: { event_id: eventId },
    });

    return res.status(201).send(interests);
  } catch (error) {
    console.log(error);
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
    return res.status(500).json({ message: err });
  }
};

module.exports = { expressInterest, getInterest, deleteInterest };
