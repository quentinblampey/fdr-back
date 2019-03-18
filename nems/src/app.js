/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable quotes */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const errorHandler = require("./error-handler").handler();

const users = require("./routes/users");
const answers = require("./routes/answers");
const questions = require("./routes/questions");
const file = require("./routes/file");
const enseignants = require("./routes/enseignants");
const stats = require("./routes/stats");
const assign = require("./routes/assign");
const rdv = require("./routes/rdv");
const creneaux = require("./routes/creneaux");
const contrats = require("./routes/contrats");
const slots = require("./routes/slots");

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
app.use("/api/rdv", rdv);
app.use("/api/creneaux", creneaux);
app.use("/api/contrats", contrats);
app.use("/api/slots", slots);

// Basic error handling middleware
app.use(errorHandler);

module.exports = app;
