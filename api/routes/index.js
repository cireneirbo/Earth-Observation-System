const express = require('express');
const router = express.Router();
const events = require("../controllers/events");
const axios = require("axios").default; // .default allows for typescript intellisense, if necessary

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET events page. */
router.get('/events', function(req, res, next) {

  //res.render('events', { data: response });
  res.json(events.getEvents());
  
});

module.exports = router;
