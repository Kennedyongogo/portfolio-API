const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const { authenticateToken } = require("../middleware/authMiddleware");
const { upload } = require("../utils/imageUpload");

// Public routes
router.get("/", profileController.getProfile);

// Route to update just the bio
router.put("/bio", authenticateToken, profileController.updateBio);

// Protected routes
router.put(
  "/",
  authenticateToken,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  profileController.updateProfile
);

router.put(
  "/social-links",
  authenticateToken,
  profileController.updateSocialLinks
);

module.exports = router;
