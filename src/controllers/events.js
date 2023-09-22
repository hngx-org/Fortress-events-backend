
const { Event } = require("../model");
const { NotFoundError } = require("../errors");


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

module.exports = deleteEvent
