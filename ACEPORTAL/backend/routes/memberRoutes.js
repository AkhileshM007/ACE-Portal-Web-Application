const express = require("express");
const { 
  getMemberProfile,
  updateMemberProfile,
  registerForEvent,
  getRegisteredEvents,
  getNewsletters,
  getAllEvents
} = require("../controllers/memberController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();
router.use(protect);

// Member profile routes
router.get("/profile", getMemberProfile);
router.put("/profile", updateMemberProfile);

// Event routes
router.get("/events", getAllEvents); // Add this line
router.post("/events/register", registerForEvent);
router.get("/events/registered", getRegisteredEvents);

// Newsletter routes
router.get("/newsletters", getNewsletters);

module.exports = router;