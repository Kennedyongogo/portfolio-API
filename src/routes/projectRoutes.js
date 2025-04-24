const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const { authenticateAdmin } = require("../middleware/authMiddleware");

// Public routes (no authentication needed)
router.get("/", projectController.getAllProjects);
router.get("/featured", projectController.getFeaturedProjects);
router.get("/:id", projectController.getProjectById);
router.get("/search", projectController.searchProjects);

// Admin routes (authentication required)
router.post("/", authenticateAdmin, projectController.createProject);
router.put("/:id", authenticateAdmin, projectController.updateProject);
router.delete("/:id", authenticateAdmin, projectController.deleteProject);

module.exports = router;
