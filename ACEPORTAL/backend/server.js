// JavaScript
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const memberRoutes = require("./routes/memberRoutes");

dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/member", memberRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack.red);
  res.status(500).json({
    success: false,
    error: err.message || "Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : null
  });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`.yellow.bold)
);

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});