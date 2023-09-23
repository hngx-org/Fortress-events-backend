const { Event, User, InterestedEvent, GroupEvent } = require("../model");
const { NotFoundError } = require("../errors");

const createEvent = async (req, res) => {
  try {
    const event = await Event.create({ ...req.body });
    const response = req.body;
    if (event) {
      if (req.body.group_Id) {
        const newGroupEvent = await GroupEvent.create({
          group_id: req.body.group_Id,
          event_id: event.id,
        });
      }
      return res.status(201).json({ event });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      order: [["start_date", "DESC"]],
      limit: 50,
      attributes: {
        exclude: [{ start_date: "null" }],
      },
    });
    res.status(200).json({ data: events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllEventsPerUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const events = await User.findByPk(userId, {
      include: [
        {
          model: Event,
          through: {
            model: InterestedEvent,
          },
        },
      ],
    });
    res.status(200).json({ events });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

const getSingleEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findByPk(eventId);
    if (!event) {
      throw new NotFoundError("Event not found");
    }
    res.status(200).json({ data: event });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: error.message });
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
    res.status(404).json({ error: error.message });
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
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getAllEventsPerUserId,
  getSingleEvent,
  updateEvent,
  deleteEvent,
};
