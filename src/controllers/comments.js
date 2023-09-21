// const sequelize = require('sequelize');
// const { Event, Comment} = require('../model');
// const { NotFoundError} = require('../errors');


// // Get comments from an event by Id
// const getSingleComment = async (req, res) => {
//     try {
//       const eventId = req.params;
  
//       // Find the event by ID and include associated comments
//       const event = await Event.findByPk(eventId, {
//         include: Comment,
//       });
  
//       if (!event) {
//         throw new NotFoundError("Event not found");
//       }
//       return res.status(200).json(event.Comments);

//     } catch (error) {

//       console.error(error);
//       return res.status(404).json({ message: error.message });
//     }
//   };
  
//         // Add a comment to an event
//     const addComment = async (req, res) => {
//     try {
//       const eventId = req.params.eventId;
//       const { body, user_id } = req.body;
  
//       // Create a new comment
//       const newComment = await Comment.create({
//         body,
//         user_id,
//         event_id: eventId,
//       });
  
//       return res.status(201).json(newComment);
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//   };
  
//   module.exports = router;