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
const { sequelize } = require("../config/dbConfig");

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
    console.log(req.body);
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
    const events = await sequelize.query(
      "SELECT events.*, GROUP_CONCAT(users.avatar) AS interested_users, COUNT(users.id) AS user_count FROM events JOIN interested_events ON events.id = interested_events.event_id JOIN users ON interested_events.user_id = users.id WHERE events.start_date >= DATE_SUB(NOW(), INTERVAL 1 MONTH) GROUP BY events.id, events.title",
      { type: sequelize.QueryTypes.SELECT }
    );

    const remainingEvents = await sequelize.query(
      "SELECT * FROM events WHERE events.id NOT IN (SELECT DISTINCT event_id FROM interested_events) AND events.start_date >= DATE_SUB(NOW(), INTERVAL 1 MONTH) ",
      { type: sequelize.QueryTypes.SELECT }
    );

    const parse_events = events.map((event) => {
      if (event.interested_users) {
        event.interested_users = event.interested_users?.split(",");
      } else {
        event.interested_users = [];
      }
      return event;
    });

    const parsed = remainingEvents.map((event) => {
      if (event.interested_users) {
        event.interested_users = event.interested_users?.split(",");
      } else {
        event.interested_users = [];
      }
      return event;
    });

    const allEvents = parse_events.concat(parsed);
    allEvents.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });

    res.status(200).json({ data: allEvents });
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
