// controllers/events.js
const { Event } = require("../model");
const { NotFoundError } = require("../errors");
const {User} = require('../model')

const createEvent = async (req, res) => {
  try {
    const event = await Event.create({ ...req.body });
    res
      .status(201)
      .json({ data: event, message: "Event created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
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

const getAllEventsPerUserId = async(req, res)=>{
try {
  const {userId} = req.params
  const user = await User.findByPk(userId);
  if (!user) {
    console.log('User not found');
    return [];
  }
  const events = await user.getEvents({
    through: InterestedEvent,
  });
  // return events;
  res.status(200).json({events})
} catch (error) {
  console.error('Error:', error);
  throw error;
}
}


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
  getAllEventsPerUserId,
  getSingeEvent,
  updateEvent,
  deleteEvent,
};
