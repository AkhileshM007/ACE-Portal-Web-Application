// JavaScript
const Event = require("../models/Event");
const Member = require("../models/Member");

const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find({});
    res.status(200).json({ success: true, data: members });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch members", error: error.message });
  }
};

const deleteMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({ success: false, message: "Member not found" });
    }
    res.status(200).json({ success: true, message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete member", error: error.message });
  }
};

const createEvent = async (req, res) => {
  const { title, description, date, location } = req.body;
  try {
    const event = new Event({ title, description, date, location });
    await event.save();
    res.status(201).json({ success: true, message: "Event created successfully", data: event });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create event", error: error.message });
  }
};

const updateEvent = async (req, res) => {
  const { title, description, date, location } = req.body;
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }
    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    event.location = location || event.location;
    await event.save();
    res.status(200).json({ success: true, message: "Event updated successfully", data: event });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update event", error: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }
    res.status(200).json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete event", error: error.message });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch events", error: error.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }
    res.status(200).json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch event details", error: error.message });
  }
};

module.exports = {
  getAllMembers,
  deleteMember,
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent
};