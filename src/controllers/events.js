const sequelize = require("sequelize");
const { Event } = require("../model");
const { NotFoundError } = require("../errors");

//create event
const createEvent = async (req, res) => {
  try {
    // return res.send(req.body);
    const event = await Event.create({ ...req.body });
    return res.status(201).json({ event });
  } catch (error) {
    console.error(error);
  }
};

// get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.status(200).json({ events });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message });
  }
};

//get event by id
const getSingeEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findByPk(eventId);

    if (!event) {
      throw new NotFoundError("Event not found");
    }

    res.status(200).json({ event });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message });
  }
};

// update event

const updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.update(
      { ...req.body },
      { where: { id: eventId } }
    );

    if (!event) {
      throw new NotFoundError("Event not found");
    }

    res.status(200).json({ event });
  } catch (error) {
    console.error(error);
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.destroy({ where: { id: eventId } });

    if (!event) {
      throw new NotFoundError("Event not found");
    }

    res.status(200).json({ event });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getSingeEvent,
  updateEvent,
  deleteEvent,
};
