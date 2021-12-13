#! /usr/bin/env node
// run this script by typing 'node populateDB.js' into the terminal

// import libraries and files
const async = require('async');
const axios = require('axios');
const Event = require('./models/event');
require('dotenv').config();

// Connect to MongoDB
const mongoose = require('mongoose');
const dbUserName = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DBNAME;
const mongoDB = `mongodb+srv://${dbUserName}:${dbPassword}@cluster0.umoy2.mongodb.net/${dbName}?retryWrites=true&w=majority`;   
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// run this script with the command : `node populateDB.js`
console.log('This script populates some initial events data to the database.');

// create array for events
const events = [];

// save events data to database
function eventCreate(id, title, description, link, closed, categories, sources, geometry, cb) {
    let eventDetail = {
        eonet_id: id,
        eonet_title: title,
        eonet_description: description,
        eonet_link: link,
        eonet_closed: closed,
        eonet_categories: categories,
        eonet_sources: sources,
        eonet_geometry: geometry
      }
    
  const eventObj = new Event(eventDetail);    
  eventObj.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Event: ' + eventObj);
    events.push(eventObj)
    cb(null, eventObj)
  }  );
}

// hardcode in events data and then initiate a db save function
function createEvents(cb) {
    async.parallel([
        function(callback) {
          eventCreate('EONET_5922', 'Cougar Peak Fire', null, 'https://eonet.gsfc.nasa.gov/api/v3/events/EONET_5922', null, [ { id: 'wildfires', title: 'Wildfires' } ], [ { id: 'InciWeb', url: 'http://inciweb.nwcg.gov/incident/7835/' } ], [ { magnitudeValue: null, magnitudeUnit: null, date: '2021-09-09T13:45:00Z', type: 'Point', coordinates: ['long', 'lat'] } ], callback);
        },
        // add more hardcoded data here like above
        ],
        // optional callback
        cb);
}

// run all function calls in series
async.series([
    createEvents
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+ err);
    }
    else {
        console.log('Events: '+ events);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});
