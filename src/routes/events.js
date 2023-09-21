const express = require('express');
const router = express.Router();
const { Event } = require('../model'); // Import the Event model

// DELETE route to delete an event by its ID
router.delete('/events/:eventId', async (req, res) => {
  try {
    // Extract the event ID from the request parameters
    const eventId = req.params.eventId;

    // Find the event in the database by its ID
    const event = await Event.findByPk(eventId);

    // If the event doesn't exist, return a 404 Not Found response
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Delete the event from the database
    await event.destroy();

    // Respond with a success message
    res.status(204).send();
  } catch (error) {
    // Handle errors, such as database errors, and return a 500 Internal Server Error response
    console.error(error);
    res.status(500).json({ message: 'An error occurred while deleting the event' });
  }
});

module.exports = router;
