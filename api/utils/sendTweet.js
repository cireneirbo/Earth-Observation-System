// checks dates on retrieved data of the last 1 day. 

// if the geometry.date in each event is less than the duration between tweets/checks, send that data to twitter

// makes an array of possible events and then sends a tweet for each one. this will usually be 1 tweet.
/*
for(let i = 0; i < events.length; i++) {
    if(events[i].geometry.date < durationSinceLastTweet) {
        // Send a tweet of that event
    }
    else {
        // Ignore / do nothing
    }
}
*/
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
require('dotenv').config();

//sample twitter request
let url = "https://api.twitter.com/2/tweets/search/recent?query=from:kalefice";
let bearerToken = "Bearer " + process.env.TWITTER_BEARER_TOKEN;
let xhr = new XMLHttpRequest();
xhr.open("GET", url);

xhr.setRequestHeader("Authorization", bearerToken);

xhr.onreadystatechange = function () {
   // In local files, status is 0 upon success in Mozilla Firefox
   if(xhr.readyState === 4) { // 4 = DONE = The operation is complete.
    let status = xhr.status;
    if (status === 0 || (status >= 200 && status < 400)) {
      // The request has been completed successfully
      console.log(xhr.responseText);
    } else {
      // Oh no! There has been an error with the request!
    }
  }
};

xhr.send();