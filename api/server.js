require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
// const { create } = require("./db/db");

mongoose.set("strictQuery", true);

const app = express();
app.use([morgan("dev"), cors(), express.json()]);
app.use("/api/v1/tickets", require("./routes/tickets"));

app.get("/health", (_req, res) => {
  res.status(200).json({ message: "Success" });
});

app.use((_req, _res, next) => {
  const error = new Error("Resource not found");
  error.status = 404;
  next(error);
});

app.use((error, _req, res, _next) => {
  if (error.status) {
    res.status(error.status).json({
      message: error.message,
    });
  }

  res.status(500).json({ message: "Something went wrong" });
});

const PORT = process.env.PORT || 8000;

mongoose
  .connect("mongodb://127.0.0.1:27017/raffle-draw")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on PORT ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e.message);
  });
