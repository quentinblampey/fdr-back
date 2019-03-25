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

const users = require("./routes/users");
const answers = require("./routes/answers");
const questions = require("./routes/questions");
const file = require("./routes/file");
const enseignants = require("./routes/enseignants");
const stats = require("./routes/stats");
const slots = require("./routes/slots");
const assign = require("./routes/assign");
const contrats = require("./routes/contrats");

const app = express();

// Register middlewares
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

// Define routes
app.use("/api/users", users);
app.use("/api/assign", assign);
app.use("/api/answers", answers);
app.use("/api/questions", questions);
app.use("/api/file", file);
app.use("/api/enseignants", enseignants);
app.use("/api/stats", stats);
app.use("/api/contrats", contrats);
app.use("/api/slots", slots);

// Basic error handling middleware
app.use(errorHandler);

/* HORLOGE DE MISE À JOUR DES INDICATEURS */
let date = new Date();

function intervalFunc() {
  const newDate = new Date();
  const day = newDate.getDate();
  if (day === date.getDate()) {
    date = newDate;
    console.log(
      "Nouvelle journée : " + date + ", mise à jour des indicateurs!"
    );
    axios.put(`http://localhost:8080/api/users/save_scores`).catch(error => {
      console.log("axios error: " + error);
    });
  } else {
    console.log("Serveur Online!");
  }
}

const time = (1000 * 60) / 4;

setInterval(intervalFunc, time);

module.exports = app;
