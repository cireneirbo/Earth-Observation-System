// import libraries and project files
const axios = require("axios");
//const async = require("async");
//const { response } = require("express");

// Display links for all events pages
exports.index = function(req, res, next) {

    const links = [
        { url: "http://localhost:9000/events/check", text: "Check for Events" }
    ];

    // res.render('events_home', { title: 'EONET Events Links', links: links } );
    res.send( { title: 'EONET Events Links', links: links } );

}

// Check and list an API request for data from NASA API
exports.events_check = function (req, res, next) {

    // declare url
    const nasaApiUrl = "https://eonet.gsfc.nasa.gov/api/v3/events?limit=20&days=400&status=open";

    // declare GET request to return events data from EONET
    async function getNasaEvents(pugPage, pugTitle, fetchURL) {

        try {

            // const response = await axios.get(nasaApiUrl);
            const response = await axios.get(fetchURL);
            const eventPage = "http://localhost:9000/events/detail/"; // change this to '/events/detail/' route for the hosted site
            
            //res.render(pugPage, { title: pugTitle, events: response.data , eventPage: eventPage } );
            res.send( { title: pugTitle, events: response.data , eventPage: eventPage } );

        } catch (error) {

            console.error(error);
            // res.render('error', { error: error } );
            res.send( { error: error } );

        }

    }

  // Call the getNasaEvents function
  getNasaEvents('events_check', 'EONET Events', nasaApiUrl);

}

// Display details for a single event pages
exports.events_detail = function(req, res, next) {

    // declare the URL
    const nasaEventApiUrl = "https://eonet.gsfc.nasa.gov/api/v3/events/" + req.params.eventID;
    
    // declare GET request to return events data from EONET
    async function getSingleNasaEvent(eventPage, eventID, fetchURL) {
        
        try {

            const response = await axios.get(fetchURL);
            console.log(response.data);
            //res.render(eventPage, { title: eventID, event: response.data } );
            res.send( { title: eventID, event: response.data } );

        } catch (error) {

            console.error(error);
            // res.render('error', { error: error } );
            res.send( { error: error } );

        }

    }

    // Call the getSingleNasaEvent function
    getSingleNasaEvent('event_detail', req.params.eventID, nasaEventApiUrl);

}
