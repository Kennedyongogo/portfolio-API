const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to database");
    // Use force: true only in development and when you want to reset the database
    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });

module.exports = sequelize;
