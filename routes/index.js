const express = require('express');
const router = express.Router();
const request = require('request'); // library used to make API calls

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET events page
router.get('/events', (req, res, next) => {
  request('https://eonet.sci.gsfc.nasa.gov/api/v3/events?limit=5&days=20&source=InciWeb&status=open', function (error, response, body) {
    if(error) {
      console.error('error:', error); // Print the error if one occurred
    }
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the response for the API.
    res.send(body);
  });
});



module.exports = router;
