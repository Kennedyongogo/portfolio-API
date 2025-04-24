const jwt = require("jsonwebtoken");

// Function to generate admin token
const generateAdminToken = () => {
  const secretKey = process.env.ADMIN_SECRET_KEY;

  // Create token with superadmin role
  const token = jwt.sign(
    {
      role: "superadmin",
      timestamp: Date.now(),
    },
    secretKey,
    { expiresIn: "24h" } // Token expires in 24 hours
  );

  return token;
};

module.exports = { generateAdminToken };
