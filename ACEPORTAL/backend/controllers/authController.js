// JavaScript
const jwt = require("jsonwebtoken");
const Member = require("../models/Member");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const member = await Member.findOne({ email });
    if (!member) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    const isMatch = await member.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: member._id, role: member.role }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });
    res.status(200).json({
      success: true,
      token,
      user: {
        id: member._id,
        name: member.name,
        email: member.email,
        role: member.role
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Login failed", error: error.message });
  }
};

const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const memberExists = await Member.findOne({ email });
    if (memberExists) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }
    const member = await Member.create({
      name,
      email,
      password,
      role: role || "member"
    });
    const token = jwt.sign({ id: member._id, role: member.role }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });
    res.status(201).json({
      success: true,
      token,
      user: {
        id: member._id,
        name: member.name,
        email: member.email,
        role: member.role
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Registration failed", error: error.message });
  }
};

const verifyToken = async (req, res) => {
  try {
    const member = await Member.findById(req.user.id).select("-password");
    if (!member) {
      return res.status(404).json({ success: false, message: "Member not found" });
    }
    res.status(200).json({
      success: true,
      user: {
        id: member._id,
        name: member.name,
        email: member.email,
        role: member.role
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Token verification failed", error: error.message });
  }
};

module.exports = {
  login,
  register,
  verifyToken
};