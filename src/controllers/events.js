const {
  Event,
  User,
  InterestedEvent,
  GroupEvent,
  Comment,
} = require("../model");
const { NotFoundError } = require("../errors");
const express = require("express");
const session = require("express-session");
const { Op } = require("sequelize");

const createEvent = async (req, res) => {
  try {
    // check for creator_id is missing in the body and add it if there is req.session.user.id
    try {
      if (!req.body.creator_id) {
        req.body.creator_id = req.session.user.id;
      }
    } catch (error) {
      console.log("you arent logged in");
    }

    const event = await Event.create({ ...req.body });
    const response = req.body;
    console.log(req.body);
    if (event) {
      if (req.body.group_id) {
        const newGroupEvent = await GroupEvent.create({
          group_id: req.body.group_id,
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
      where: {
        start_date: {
          [Op.gte]: new Date(), // Filter events with a start date greater than or equal to the current date
        },
      },
      order: [["created_at", "DESC"]],
      // limit: 1000,
      // attributes: {
      //   exclude: [{ start_date: "null" }],
      // },
      //get all users who are interested in the event
      // include: [{ model: User, through: { model: InterestedEvent } }],
    });
    res.status(200).json({ data: events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
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

// Get all users interested Users for an event by ID
const getNumUserFromEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    // Use Sequelize aggregation to count interested users for the specified event
    const interestedUsersCount = await InterestedEvent.count({
      where: { event_id: eventId },
    });
    res.status(200).json({ interestedUsersCount });
  } catch (error) {
    console.error("Error fetching interested users count:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// number of comments for event
// Get all users interested Users for an event by ID
const getNumCommentForEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    // Use Sequelize aggregation to count interested users for the specified event
    const commentedUsersCount = await Comment.count({
      where: { event_id: eventId },
    });
    res.status(200).json({ commentedUsersCount });
  } catch (error) {
    console.error("Error fetching interested users count:", error);
    res.status(500).json({ error: "Internal server error" });
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
  getNumUserFromEvent,
  getNumCommentForEvent,
};
