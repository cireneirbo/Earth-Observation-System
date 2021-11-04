var express = require('express');
var router = express.Router();
//const apiCall = require("../api-returns/eonet.mjs");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET events page. */
router.get('/events', function(req, res, next) {
  res.render('events', { title: 'Events' });
  //res.send(apiCall());
});

module.exports = router;
