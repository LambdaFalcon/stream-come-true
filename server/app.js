const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const { env } = require('./config');

// Import routers
const indexRouter = require('./routes/index');
const milestone1Router = require('./routes/milestone1');

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
if (env === 'development') app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Register routers
app.use('/', indexRouter);
app.use('/milestone1', milestone1Router);

// Catch 404 and setup error handler
app.use(catch404);
app.use(errorHandler);

module.exports = app;
