const axios = require("axios").default; // .default allows for typescript intellisense, if necessary

// Make a request for a user with a given URL
exports. getEvents = function getEvents() {
    axios.get('https://eonet.sci.gsfc.nasa.gov/api/v3/events?limit=5&days=400&source=InciWeb&status=open')
      .then(function (response) {
        // handle success
        console.log(response.data);
        return response.data;
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