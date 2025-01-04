const Member = require("../models/Member");
const Event = require("../models/Event");
const Newsletter = require("../models/Newsletter");

// Get member profile
const getMemberProfile = async (req, res) => {
  try {
    const member = await Member.findById(req.user.id).select("-password");
    if (!member) {
      return res.status(404).json({ 
        success: false, 
        message: "Member not found" 
      });
    }
    res.status(200).json({ success: true, data: member });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch profile", 
      error: error.message 
    });
  }
};

// Update member profile
const updateMemberProfile = async (req, res) => {
  try {
    const updatedMember = await Member.findByIdAndUpdate(
      req.user.id,
      { 
        name: req.body.name,
        email: req.body.email 
      },
      { new: true }
    ).select("-password");

    if (!updatedMember) {
      return res.status(404).json({ 
        success: false, 
        message: "Member not found" 
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedMember
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Failed to update profile", 
      error: error.message 
    });
  }
};

// Get all available events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({}).sort({ date: 1 });
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch events",
      error: error.message
    });
  }
};

// Register for an event
const registerForEvent = async (req, res) => {
  const { eventId } = req.body;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ 
        success: false, 
        message: "Event not found" 
      });
    }

    const member = await Member.findById(req.user.id);
    if (!member) {
      return res.status(404).json({ 
        success: false, 
        message: "Member not found" 
      });
    }

    if (member.registeredEvents.includes(eventId)) {
      return res.status(400).json({ 
        success: false, 
        message: "Already registered for this event" 
      });
    }

    member.registeredEvents.push(eventId);
    await member.save();

    event.registeredMembers.push(member._id);
    await event.save();

    res.status(200).json({ 
      success: true, 
      message: "Successfully registered for the event" 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Failed to register for event", 
      error: error.message 
    });
  }
};

// Get registered events
const getRegisteredEvents = async (req, res) => {
  try {
    const member = await Member.findById(req.user.id)
      .populate("registeredEvents");
    
    if (!member) {
      return res.status(404).json({ 
        success: false, 
        message: "Member not found" 
      });
    }

    res.status(200).json({ 
      success: true, 
      data: member.registeredEvents 
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch registered events",
      error: error.message
    });
  }
};

// Get all newsletters
const getNewsletters = async (req, res) => {
  try {
    const newsletters = await Newsletter.find({})
      .sort({ date: -1 });
    
    res.status(200).json({
      success: true,
      data: newsletters
    });
  } catch (error) {
    console.error('Newsletter fetch error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch newsletters",
      error: error.message
    });
  }
};

module.exports = {
  getMemberProfile,
  updateMemberProfile,
  getAllEvents,
  registerForEvent,
  getRegisteredEvents,
  getNewsletters
};