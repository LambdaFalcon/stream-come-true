const express = require('express');
const path = require('path');
const { env } = require('../config.js');

const router = express.Router();

if (env === 'development') {
  router.get('/', (req, res) => {
    res.render('index', { title: 'Stream Come True' });
  });
} else if (env === 'production') {
  router.use(express.static(path.resolve(__dirname, '../../client/build')));
  router.get('/', (req, res) => {
    res.sendFile('index.html');
  });
}
module.exports = router;
