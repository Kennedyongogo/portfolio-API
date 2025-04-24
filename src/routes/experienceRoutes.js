const express = require("express");
const router = express.Router();
const experienceController = require("../controllers/experienceController");
const { authenticateAdmin } = require("../middleware/authMiddleware");

// Public routes (no authentication needed)
router.get("/", experienceController.getAllExperiences);
router.get("/current", experienceController.getCurrentExperience);
router.get("/:id", experienceController.getExperienceById);
router.get("/company/:company", experienceController.getExperiencesByCompany);

// Admin routes (authentication required)
router.post("/", authenticateAdmin, experienceController.createExperience);
router.put("/:id", authenticateAdmin, experienceController.updateExperience);
router.delete("/:id", authenticateAdmin, experienceController.deleteExperience);

module.exports = router;
