const express = require("express");
const router = express.Router();
const skillController = require("../controllers/skillController");
const { authenticateAdmin } = require("../middleware/authMiddleware");

// Public routes (no authentication needed)
router.get("/", skillController.getAllSkills);
router.get("/top", skillController.getTopSkills);
router.get("/:id", skillController.getSkillById);
router.get("/category/:category", skillController.getSkillsByCategory);

// Admin routes (authentication required)
router.post("/", authenticateAdmin, skillController.createSkill);
router.put("/:id", authenticateAdmin, skillController.updateSkill);
router.delete("/:id", authenticateAdmin, skillController.deleteSkill);

module.exports = router;
