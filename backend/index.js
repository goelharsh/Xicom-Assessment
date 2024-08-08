const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const database = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 4000;
dotenv.config();

// Connect to the database
database.connect();

// Middleware setup
app.use(bodyParser.json()); // Parse JSON payloads
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded payloads
app.use(express.json()); // Parse JSON payloads
app.use(
  cors({
    origin: "*", // Allow requests from any origin (replace with your actual frontend URL in production)
    credentials: true,
  })
);

// Routes
app.use("/api/v1/user", userRoutes); // Mount user routes under /api/v1/user

// Test route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running",
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
