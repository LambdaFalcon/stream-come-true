const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

// Import api and config
const api = require('./api');
const config = require('./config');

// Import error handlers
const catch404 = require('./utils/catch404');
const errorHandler = require('./utils/errorHandler');

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Allow all CORS
app.use(cors());

// Other settings
if (config.env === 'development') app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files for error pages and static React App
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Register development index router
if (config.env === 'development') {
  app.get('/', (req, res) => {
    res.render('index', { title: 'Stream Come True' });
  });
}

// Catch 404 and setup error handler
app.use(catch404);
app.use(errorHandler);

module.exports = app;
