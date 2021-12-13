#! /usr/bin/env node

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

// run this script with the command : `node populate-db`
console.log('This script populates some initial events data to the database.');

// create array for events
const events = [];

// create event and save event to database
function eventCreate(id, title, description, link, closed, categories, sources, geometry, cb) {
  // create an object to pass in to new Event(object)
  eventDetail = {
    id: id,
    title: title,
    description: description,
    link: link,
    closed: closed,
    categories: categories,
    sources: sources,
    geometry: geometry
  }

  // create instance of event
  const event = new Event(eventDetail);

  // testing console.log output to save
  // console.log(id, title, description, link, closed, categories, sources, geometry);
  console.log(eventDetail);
  console.log(event);
  //events.push(event);

  // save event to db
  event.save(function (err) {
    if(err) {
      console.log('ERROR CREATING Event: ' + event);
      cb(err, null);
      return;
    }
    console.log('New Event: ' + event);
    events.push(event);
    cb(null, event);
  });

}




/*
// GET request to return events data from EONET
async function getNasaEvents() {

  // declare url
  const nasaApiUrl = "https://eonet.sci.gsfc.nasa.gov/api/v3/events?limit=5&days=400&source=InciWeb&status=open";
  
  try {
      const response = await axios.get(nasaApiUrl);
      const obj = response.data.events;
      
      for(let i = 0; i < obj.length; i++) {
        eventCreate(obj[i].id, obj[i].title, obj[i].description, obj[i].link, obj[i].closed, obj[i].categories, obj[i].sources, obj[i].geometry);
      }
      return response.data.events;
  } catch (error) {
      console.error(error);
  }

}*/

//const data = getNasaEvents();

function createEvents(cb) {
  async.parallel([
    async function(callback) {
      //const data = getNasaEvents();
      // declare url
      const nasaApiUrl = "https://eonet.sci.gsfc.nasa.gov/api/v3/events?limit=5&days=400&source=InciWeb&status=open";
      
      try {
          const response = await axios.get(nasaApiUrl);
          const obj = response.data.events;
          
          for(let i = 0; i < obj.length; i++) {
            eventCreate(obj[i].id, obj[i].title, obj[i].description, obj[i].link, obj[i].closed, obj[i].categories, obj[i].sources, obj[i].geometry, callback);
          }
          //return response.data.events;
      } catch (error) {
          console.error(error);
      }
      //console.log(data);
      /*data.forEach(element => {
        eventCreate(element[0], element[1], element[2], element[3], element[4], element[5], element[6], element[7])
      });*/
      /*for(let i = 0; i < data.length; i++) {
        for(let y = 0; y < data[i].length; y++) {
          eventCreate(data[i][0], data[i][1], data[i][2], data[i][3], data[i][4], data[i][5], data[i][6], data[i][7])
        }
      }*/
    }
  ],
  // Optional callback
  cb);
}

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

