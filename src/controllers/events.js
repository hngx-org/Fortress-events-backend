const sequelize = require("sequelize");
const { Event, User } = require("../model");
// controllers/events.js
const { Event } = require("../model");
const { NotFoundError } = require("../errors");

// helper functions
const validateEvent = require('../utils/validator');

//create event
const createEvent = async (req, res) => {
  const { title, description, location, start_date, end_date, start_time, end_time } = req.body;

  // validating the request from the front-end
  if (!title || !description || !location || !start_date || !end_date || !start_time || !end_time) {
    return res.status(404).json({
      message: 'One or more required fields are missing.'
    });
  };

  // Validate the request using Joi
  const event = {
    title, description, location, start_date, end_date, end_time, start_time
  }

  const response = validateEvent(event);
  if (response.error) {
    return res.status(400).json({
      message: 'Invalid request data.',
      error: response.error.details,
    })
  };

  // get user from the auth middleware
  const user = req.user;
  const userId = user.id;
  // find user
  const userExist = await User.findOne({
    where: {
      id: userId
    }
  });
  // throw an error if user does not exist
  if (!userExist) {
    return res.status(404).json({ message: 'invalid credentials' });
  }

  try {
    const createEvent = await Event.create({
      title,
      description,
      location,
      creator_id: userId, // this is hard coded, should pass the actual id from the auth middle
      start_date,
      end_date,
      start_time,
      end_time,
    });
    return res.status(201).json({
      data: createEvent,
      message: 'event created succesfully',
      success: true
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'internal server error'
    });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.status(200).json({ data: events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getSingeEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findByPk(eventId);

    if (!event) {
      throw new NotFoundError("Event not found");
    }

    res.status(200).json({ data: event });
  } catch (error) {
    console.error(error);
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const [updatedRowsCount] = await Event.update(
      { ...req.body },
      { where: { id: eventId } }
    );

    if (updatedRowsCount === 0) {
      throw new NotFoundError("Event not found");
    }

    res.status(200).json({ message: "Event updated successfully" });
  } catch (error) {
    console.error(error);
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const deletedRowCount = await Event.destroy({ where: { id: eventId } });

    if (deletedRowCount === 0) {
      throw new NotFoundError("Event not found");
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error(error);
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getSingeEvent,
  updateEvent,
  deleteEvent,
};
