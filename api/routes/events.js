//import libraries and project files
const express = require('express');
const router = express.Router();
const events = require("../controllers/eventsController");

/* GET events page. */
router.get('/', function(req, res) {

  const response = events.getEvents();
  res.render('events', { data: events.getEvents() });
  //res.json(events.getEvents());
  
});

module.exports = router;
