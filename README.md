# Earth-Observation-System
A system for alerting users to local and regional disasters using the NASA EONET API.

## Getting Started
* Fork or Clone repository
* install dependencies with `npm install`
* create file `.env` in the root directory
* inside `.env`, copy-paste the code from `.env-sample` and replace value with your API key from https://api.nasa.gov/
* run with `npm start`
* navigate to `http://localhost:3000/`

### Setting Up Database
* [Mozilla Developer Network MongoDB Setup](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#setting_up_the_mongodb_database) - A tutorial for setting up a MongoDB connection.

## Dependencies
* [Express](https://expressjs.com/en/4x/api.html) - A lightweight, Node.js backend framework.
* [NASA's Earth Observatory Natural Event Tracker (EONET) API](https://eonet.sci.gsfc.nasa.gov/docs/v3) - NASA API with data on currnet natural disasters.
* [Pug](https://www.npmjs.com/package/pug) - An HTML templating library.
* [Request](https://www.npmjs.com/package/request)
* [Axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and node.js.
* [Helmet](https://www.npmjs.com/package/helmet) - Helps secure Express apps.
* [Mongoose](https://www.npmjs.com/package/mongoose) - ODM for communicating with MongoDB.
* [Luxon](https://www.npmjs.com/package/luxon) - Converts Date strings into a more readable form.
* [MongoDB]()
* [Dotenv]()


## Helpful Links
* HTML to Jade - https://html2jade.org/
* DigitalOcean hosting - https://www.digitalocean.com/pricing/
* Heroku hosting - https://id.heroku.com/login
* Twitter API - https://developer.twitter.com/en/docs/twitter-api
* JS Time Functions https://stackoverflow.com/questions/24741530/in-javascript-how-can-i-have-a-function-run-at-a-specific-time
* Pug Reference https://pugjs.org/language/iteration.html
* [Netlify](https://www.netlify.com/) - hosting for ReactJS
* [Kue](https://www.npmjs.com/package/kue) - manages background tasks in Node.js backends.
* [More Kue](https://www.javascripttuts.com/create-node-js-background-task-using-kue-workers/)
* [CSS Color Scheme Picker](https://paletton.com/#uid=7340w0kl1Wx1x+IcEXDsUWkWEVB)
* [cURL to AJAX request converter](https://reqbin.com/req/javascript/c-wyuctivp/convert-curl-to-javascript)
