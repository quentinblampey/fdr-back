/* eslint-disable no-magic-numbers */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable quotes */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const errorHandler = require("./error-handler").handler();
const axios = require("axios");
const User = require("./models/User.js");
const saveScore = require("./routes/updateScore").saveScore;

// Importation of all the routes defined earlier.
const users = require("./routes/users");
const answers = require("./routes/answers");
const questions = require("./routes/questions");
const file = require("./routes/file");
const stats = require("./routes/stats");
const slots = require("./routes/slots");
const assign = require("./routes/assign");
const contrats = require("./routes/contrats");
const engagements = require("./routes/engagements");

// Initialization of the server.
const app = express();

// Register middlewares
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Security options.
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  // res.setHeader("Access-Control-Allow-Origin", "http://fdr.cs-campus.fr");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// App views config
app.set("view engine", "ejs");
app.set("views", "src/views");

// App static content
app.use("/static", express.static(require("path").join(__dirname, "./static")));

// Define routes previously imported.
app.use("/api/users", users);
app.use("/api/assign", assign);
app.use("/api/answers", answers);
app.use("/api/questions", questions);
app.use("/api/file", file);
app.use("/api/stats", stats);
app.use("/api/contrats", contrats);
app.use("/api/slots", slots);
app.use("/api/engagements", engagements);

// Basic error handling middleware
app.use(errorHandler);

// Functions called periodically to update the indicators.

//VERSION 1 : Update every day between 0am and 1 am :
/*
let date2 = new Date();
function updateIndicatorsDaily() {
  const newDate = new Date();
  const day = newDate.getDate();
  if (day !== date2.getDate()) {
    date2 = newDate;
    console.log(
      "Nouvelle journée : " + date2 + ", mise à jour des indicateurs!"
    );
    User.find({}, (err, users) => {
      if (err) return next(err);
      users.forEach(user => {
        saveScore(user);
        user.save();
      });
    });
  } else {
    console.log("Serveur Online!");
  }
}
const timeDaily = 1000; // * 60 * 60 ;
setInterval(updateIndicatorsDaily, timeDaily);*/

//VERSION 2 : Update every 30 seconds for demonstration of the prototype :
function updateIndicators() {
  console.log("Mise à jour des indicateurs (démonstration protoype)!");
  User.find({}, (err, users) => {
    if (err) return next(err);
    users.forEach(user => {
      saveScore(user);
      user.save();
    });
  });
}
const time = (1000 * 60) / 2;
setInterval(updateIndicators, time);

module.exports = app;
