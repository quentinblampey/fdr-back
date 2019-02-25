const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const errorHandler = require('./error-handler').handler();

const book = require('./routes/book');
const users = require('./routes/users');
const answers = require('./routes/answers');
const questions = require('./routes/questions');

const app = express();

// Register middlewares
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// App views config
app.set('view engine', 'ejs');
app.set('views', 'src/views');

// App static content
app.use('/static', express.static(require('path').join(__dirname, './static')));

// Define routes
app.use('/api/book', book);
app.use('/api/users', users);
app.use('/api/answers', answers);
app.use('/api/questions', questions);

// Basic error handling middleware
app.use(errorHandler);

module.exports = app;