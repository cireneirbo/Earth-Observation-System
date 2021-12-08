// import libraries and project files
const axios = require("axios");
const async = require("async");
//const { response } = require("express"); // what the heck is this for?
//const { getEonetEventsAsync } = require("../utils/getEonetEvents");

// Make a request for data from NASA API
exports.index = function (req, res, next) {

  // declare url
  const nasaApiUrl = "https://eonet.sci.gsfc.nasa.gov/api/v3/events?limit=5&days=400&source=InciWeb&status=open";

  // GET request to return events data from EONET
  async function getEvents() {
      try {
          const response = await axios.get(nasaApiUrl);
          console.log(response.data.events);
          res.render('events', { title: 'EONET Events', events: response.data } );
          //return response;
      } catch (error) {
          console.error(error);
      }
  }

  getEvents();

}