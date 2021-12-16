// import libraries and project files
const axios = require("axios");
const async = require("async");
const { body, validationResult } = require('express-validator');
const Event = require('../models/event');

// Make a request for data from NASA API
exports.index = function (req, res, next) {

  // declare url
  const nasaApiUrl = "https://eonet.sci.gsfc.nasa.gov/api/v3/events?limit=5&days=400&source=InciWeb&status=open";

  // declare GET request to return events data from EONET
  async function getNasaEvents() {

      try {

          const response = await axios.get(nasaApiUrl);
          console.log(response.data);
          console.log(response.data.events[1]);
          console.log("coordinates" + response.data.events[1].geometry[0].coordinates);
          res.render('events', { title: 'EONET Events', events: response.data } );

      } catch (error) {

          console.error(error);
          res.render('error', { error: error});

      }

  }

  // Call the getNasaEvents function
  getNasaEvents();

}

// Display list of all Events.
exports.events_list = function(req, res, next) {

    // Find and sort Events by eonet_title
    Event.find()
        .sort([['eonet_title', 'ascending']])
        .exec(function (err, list_events) {

            if (err) { return next(err); }
            //Successful, so render
            res.render('events_list', { title: 'Events List', events_list: list_events });

        });
  
};