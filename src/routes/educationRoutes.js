const express = require("express");
const router = express.Router();
const educationController = require("../controllers/educationController");
const { authenticateAdmin } = require("../middleware/authMiddleware");

// Public routes (no authentication needed)
router.get("/", educationController.getAllEducation);
router.get("/latest", educationController.getLatestEducation);
router.get("/:id", educationController.getEducationById);
router.get(
  "/institution/:institution",
  educationController.getEducationByInstitution
);

// Admin routes (authentication required)
router.post("/", authenticateAdmin, educationController.createEducation);
router.put("/:id", authenticateAdmin, educationController.updateEducation);
router.delete("/:id", authenticateAdmin, educationController.deleteEducation);

module.exports = router;
