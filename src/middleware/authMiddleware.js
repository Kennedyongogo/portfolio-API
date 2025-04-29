const jwt = require("jsonwebtoken");

// Simple middleware to check for admin access
exports.authenticateAdmin = (req, res, next) => {
  try {
    // Hardcoded admin password
    const adminPassword = "Carlmart2026";

    // Get the password from the request header
    const password = req.headers["x-admin-password"];

    if (!password) {
      return res
        .status(401)
        .json({ error: "Access denied. No password provided." });
    }

    // Check if the password matches
    if (password !== adminPassword) {
      return res.status(401).json({ error: "Invalid password." });
    }

    // If password is correct, proceed
    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication failed." });
  }
};

// Placeholder middleware for standard user authentication
// TODO: Implement actual token verification logic here
exports.authenticateToken = (req, res, next) => {
  console.warn(
    "WARN: authenticateToken middleware is a placeholder and allows all requests."
  );
  // Example: Get token from Authorization header (Bearer <token>)
  // const authHeader = req.headers['authorization'];
  // const token = authHeader && authHeader.split(' ')[1];
  // if (token == null) return res.sendStatus(401); // if no token

  // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
  //   if (err) return res.sendStatus(403); // if token is invalid
  //   req.user = user;
  //   next();
  // });

  // For now, just pass through
  next();
};
