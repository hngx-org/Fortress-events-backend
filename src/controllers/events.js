const sequelize = require("sequelize");
const { Event, User } = require("../model");
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
  // const user = req.user;
  // const userId = user.id;
  // find user
  // const userExist = await User.findOne({
  //   where: {
  //     id: userId
  //   }
  // });
  // throw an error if user does not exist
  // if (!userExist) {
  //   return res.status(404).json({ message: 'invalid credentials' });
  // }

  try {
    const createEvent = await Event.create({
      title,
      description,
      location,
      creator_id: "user1_id", // this is hard coded, should pass the actual id from the auth middle
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
