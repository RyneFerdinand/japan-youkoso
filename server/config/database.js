require("dotenv").config();

const mongoose = require("mongoose");

const strConnection = "mongodb://localhost/japan-youkoso";

mongoose.connect(strConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.on("error", (error) => console.log(error));
connection.once("open", () => console.log("Connected to Database..."));

module.exports = connection;
