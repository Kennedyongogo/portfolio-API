const jwt = require("jsonwebtoken");

// Simple middleware to check for admin access
exports.authenticateAdmin = (req, res, next) => {
  try {
    // Get the secret key from environment variables
    const secretKey = process.env.ADMIN_SECRET_KEY;

    // Get the token from the request header
    const token = req.headers["x-admin-token"];

    if (!token) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }

    // Verify the token
    const decoded = jwt.verify(token, secretKey);

    // Check if the token is valid and not expired
    if (!decoded || decoded.role !== "superadmin") {
      return res.status(401).json({ error: "Invalid token." });
    }

    // Add the decoded token to the request
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token." });
  }
};
