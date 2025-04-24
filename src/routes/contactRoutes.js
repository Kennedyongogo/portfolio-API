const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const { authenticateAdmin } = require("../middleware/authMiddleware");

// Public routes (no authentication needed)
router.post("/", contactController.createContact);

// Admin routes (authentication required)
router.get("/", authenticateAdmin, contactController.getAllContacts);
router.get("/unread", authenticateAdmin, contactController.getUnreadMessages);
router.get("/:id", authenticateAdmin, contactController.getContactById);
router.put("/:id", authenticateAdmin, contactController.updateContact);
router.delete("/:id", authenticateAdmin, contactController.deleteContact);
router.put("/:id/read", authenticateAdmin, contactController.markAsRead);
router.get("/search", authenticateAdmin, contactController.searchMessages);

module.exports = router;
