// import libraries and project files
const axios = require("axios");

// Make a request for data from NASA API
exports.getEvents = function () {

  // declare url
  const nasaApiUrl = "https://eonet.sci.gsfc.nasa.gov/api/v3/events?limit=5&days=400&source=InciWeb&status=open";

  // GET request to NASA API endroute
  axios.get(nasaApiUrl).then(function (response) {
      // handle success
      //console.log(response.data);
      console.log(response);
      return response.data;

    }).catch(function (error) {
      // handle error
      console.log(error);

    }).then(function () {
      // always executed
      console.log("End");

    });

}