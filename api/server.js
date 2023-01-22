require("dotenv").config();
const http = require("http");
const app = require("./app/app");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

mongoose
  .connect("mongodb://127.0.0.1:27017/raffle-draw")
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is listening on PORT ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e.message);
  });
