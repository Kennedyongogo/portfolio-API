const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

// Import routes
const projectRoutes = require("./src/routes/projectRoutes");
const experienceRoutes = require("./src/routes/experienceRoutes");
const skillRoutes = require("./src/routes/skillRoutes");
const educationRoutes = require("./src/routes/educationRoutes");
const contactRoutes = require("./src/routes/contactRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const profileRoutes = require("./src/routes/profileRoutes");

// Middleware
app.use(
  cors({
    origin: [
      "http://38.242.243.113",
      "http://38.242.243.113:80",
      "http://38.242.243.113:3003",
      "http://38.242.243.113:3036",
      "http://localhost:3003",
    ],
    credentials: true,
  })
);
app.use(express.json());

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/projects", projectRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/profile", profileRoutes);
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
