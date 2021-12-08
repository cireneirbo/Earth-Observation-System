// import libraries and project files
const axios = require("axios");
const async = require("async");
//const { response } = require("express"); // what the heck is this for?
const { getEonetEventsAsync } = require("../utils/getEonetEvents");

// Make a request for data from NASA API
exports.index = function (req, res, next) {

  // declare url
const nasaApiUrl = "https://eonet.sci.gsfc.nasa.gov/api/v3/events?limit=5&days=400&source=InciWeb&status=open";

// GET request to return events data from EONET
async function getThings() {
    try {
        const response = await axios.get(nasaApiUrl);
        console.log(response.data.events);
        res.render('events', { title: 'EONET Events', events: response.data } );
        //return response;
    } catch (error) {
        console.error(error);
    }
}

getThings();


/*
  async.parallel({
    events: function(callback) {
      //getEonetEvents.getEvents().exec(callback);
    },
  }, function(err, results) {
    if (err) { return next(err); } // Error in API usage.
    if (results.events==null) { // No results.
        let err = new Error('No events not found');
        err.status = 404;
        return next(err);
    }
    // Successful, so render.
    res.render('events', { title: 'EONET Events', events: results.events } );
  });*/
  //res.render('events', { events: {} });
}