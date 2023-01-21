// require("dotenv").config("../.env");
require("dotenv").config({ path: "/custom/path/to/.env" });
const express = require("express");
const { errorHandler, notFoundHandler } = require("./error");

const app = express();

app.use(require("./middleware"));
app.use(require("./routes"));

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
