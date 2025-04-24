const express = require("express");
const cors = require("cors");
const app = express();

// Import routes
const projectRoutes = require("./src/routes/projectRoutes");
const experienceRoutes = require("./src/routes/experienceRoutes");
const skillRoutes = require("./src/routes/skillRoutes");
const educationRoutes = require("./src/routes/educationRoutes");
const contactRoutes = require("./src/routes/contactRoutes");
const adminRoutes = require("./src/routes/adminRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/projects", projectRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);

// 404 Route handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

module.exports = app;
