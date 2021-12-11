// import libraries and project files
const axios = require("axios");
const async = require("async");
const { body, validationResult } = require('express-validator');

// Make a request for data from NASA API
exports.index = function (req, res, next) {

  // declare url
  const nasaApiUrl = "https://eonet.sci.gsfc.nasa.gov/api/v3/events?limit=5&days=400&source=InciWeb&status=open";

  // declare GET request to return events data from EONET
  async function getNasaEvents() {
      try {
          const response = await axios.get(nasaApiUrl);
          console.log(response.data);
          res.render('events', { title: 'EONET Events', events: response.data } );
          //return response;
      } catch (error) {
          console.error(error);
          res.render('error', { error: error});
      }
  }

  // Call the getNasaEvents function
  getNasaEvents();

}