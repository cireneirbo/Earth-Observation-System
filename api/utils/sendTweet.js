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
//const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
require('dotenv').config();

//let bearerToken = "Bearer " + process.env.TWITTER_BEARER_TOKEN;
//let accessToken = "Bearer " + process.env.TWITTER_ACCESS_TOKEN;


/*
//sample twitter request
let url = "https://api.twitter.com/2/tweets/search/recent?query=from:kalefice";

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

*/
/*
// send tweet
let url = "https://api.twitter.com/2/tweets";

let xhr = new XMLHttpRequest();
xhr.open("POST", url);

xhr.setRequestHeader("Authorization", accessToken);
xhr.setRequestHeader("Content-type", "application/json");

xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
   }};

let data = '{"text": "This Tweet has been brought to me by my own use of the Twitter API!"}';

xhr.send(data);
*/

const Twit = require('twit')

const twit = new Twit({
  consumer_key:         process.env.TWITTER_CONSUMER_KEY,
  consumer_secret:      process.env.TWITTER_CONSUMER_SECRET,
  access_token:         process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            false,     // optional - requires SSL certificates to be valid.
})

//
//  tweet 'hello world!'
//
twit.post('statuses/update', { status: 'This Tweet has been brought to me by my own use of the Twitter API!' }, function(err, data, response) {
  console.log(data)
})