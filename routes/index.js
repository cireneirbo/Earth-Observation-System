var express = require('express');
var router = express.Router();
//const apiCall = require("../api-returns/eonet.mjs");
const axios = require("axios").default; // default allows for typescript intellisense, if necessary

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET events page. */
router.get('/events', function(req, res, next) {
  //let response = getEvents();
  //console.log(getEvents());
  //res.render('events', { data: response });
  res.send(getEvents());
  //getEvents();
  
  
});

// Make a request for a user with a given URL
function getEvents() {
  axios.get('https://eonet.sci.gsfc.nasa.gov/api/v3/events?limit=5&days=400&source=InciWeb&status=open')
    .then(function (response) {
      // handle success
      console.log(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
      console.log("End");
    });
}

module.exports = router;
