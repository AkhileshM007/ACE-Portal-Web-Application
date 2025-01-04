// JavaScript
const express = require("express");
const {
  createEvent,
  updateEvent,
  deleteEvent,
  getEventById,
  getAllEvents,
  getAllMembers,
  deleteMember
} = require("../controllers/adminController");
const { protect, checkRole } = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(protect);
router.use(checkRole("admin"));

router.post("/events", createEvent);
router.put("/events/:id", updateEvent);
router.delete("/events/:id", deleteEvent);
router.get("/events/:id", getEventById);
router.get("/events", getAllEvents);
router.get("/members", getAllMembers);
router.delete("/members/:id", deleteMember);

module.exports = router;