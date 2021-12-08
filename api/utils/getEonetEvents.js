// import libraries and project files
const axios = require("axios");
const async = require('async');

// declare url
const nasaApiUrl = "https://eonet.sci.gsfc.nasa.gov/api/v3/events?limit=5&days=400&source=InciWeb&status=open";

// GET request to return events data from EONET
async function getEonetEventsAsync() {
    try {
        const response = await axios.get(nasaApiUrl);
        //console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
}

module.exports.getEonetEventsAsync = getEonetEventsAsync;
