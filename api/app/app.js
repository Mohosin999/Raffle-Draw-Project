require("dotenv").config({ path: "/custom/path/to/.env" });
// require("dotenv").config("../.env");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// main application
const app = express();

// middleware
app.use([morgan("dev"), cors(), express.json()]);

// route handling
app.get("/health", (_req, res) => {
  res.status(200).json({ message: "Success" });
});

module.exports = app;
