// JavaScript
const express = require("express");
const router = express.Router();
const {
  login,
  register,
  verifyToken
} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/login", login);
router.post("/register", register);
router.get("/verify", protect, verifyToken);

module.exports = router;