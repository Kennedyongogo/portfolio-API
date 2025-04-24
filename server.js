const dotenv = require("dotenv");
dotenv.config();
const http = require("http");
const app = require("./app");
const database = require("./src/config/database");

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

// Create an async function to start the server
const startServer = async () => {
  try {
    // Connect to database
    await database.authenticate();
    console.log("Database connection established successfully");

    // Sync database models
    await database.sync();
    console.log("Database models synchronized");

    // Start the server
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Call the async function to start everything
startServer();
