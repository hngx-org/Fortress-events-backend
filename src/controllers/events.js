const { Event } = require('../model');

// Update an event by ID
exports.updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { title, description, location, start_date, end_date, start_time, end_time, thumbnail } = req.body;

    // Find the event by ID
    const event = await Event.findByPk(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found', status: 404 });
    }

    // Update event details
    event.title = title;
    event.description = description;
    event.location = location;
    event.start_date = start_date;
    event.end_date = end_date;
    event.start_time = start_time;
    event.end_time = end_time;
    event.thumbnail = thumbnail;

    // Save the updated event
    await event.save();

    return res.status(200).json({ message: 'Event updated successfully', status: 200 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', status: 500 });
  }
};
