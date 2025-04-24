const express = require("express");
const router = express.Router();
const { generateAdminToken } = require("../utils/tokenGenerator");

// Route to get admin token (protected by a simple secret)
router.get("/token", (req, res) => {
  const { secret } = req.query;

  // Check if the provided secret matches the environment variable
  if (secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: "Invalid secret." });
  }

  // Generate and return the token
  const token = generateAdminToken();
  res.json({ token });
});

module.exports = router;
