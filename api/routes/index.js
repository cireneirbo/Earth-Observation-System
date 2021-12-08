const express = require('express');
const router = express.Router();
const events = require("../controllers/eventsController");
const axios = require("axios").default; // .default allows for typescript intellisense, if necessary

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Earth Observation System' });
});

module.exports = router;
