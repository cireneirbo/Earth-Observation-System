// checks dates on retrieved data of the last 1 day. 

// if the geometry.date in each event is less than the duration between tweets/checks, send that data to twitter

// makes an array of possible events and then sends a tweet for each one. this will usually be 1 tweet.

for(let i = 0; i < events.length; i++) {
    if(events[i].geometry.date < durationSinceLastTweet) {
        // Send a tweet of that event
    }
    else {
        // Ignore / do nothing
    }
}