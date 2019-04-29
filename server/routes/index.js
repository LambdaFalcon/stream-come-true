const express = require('express');
const {env} = require('../config.js')
const path = require('path');
const router = express.Router();
const app = express();

if(env === 'development') {
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Stream Come True' });
  });  

} else if(env === 'production') {
  router.use(express.static(path.resolve(__dirname, '../../client/build')));
  router.get('/', function(req, res) {
    
    res.sendFile('index.html');
  });
}
module.exports = router;
