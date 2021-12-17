// import libraries and project files
const axios = require("axios");
const async = require("async");
const { body, validationResult } = require('express-validator');
const Event = require('../models/event');

// Display links for all events pages
exports.index = function(req, res, next) {
    res.render('events_home', { title: 'EONET Events Links' } );
}

// Check an API request for data from NASA API
exports.events_check = function (req, res, next) {

  // declare url
  const nasaApiUrl = "https://eonet.sci.gsfc.nasa.gov/api/v3/events?limit=5&days=400&source=InciWeb&status=open";

  // declare GET request to return events data from EONET
  async function getNasaEvents() {

      try {

          const response = await axios.get(nasaApiUrl);
          console.log(response.data);
          console.log(response.data.events[1]);
          console.log("coordinates" + response.data.events[1].geometry[0].coordinates);
          res.render('events_check', { title: 'EONET Events', events: response.data } );

      } catch (error) {

          console.error(error);
          res.render('error', { error: error});

      }

  }

  // Call the getNasaEvents function
  getNasaEvents();

}

// Display list of all Events.
exports.events_list = function(req, res, next) {

    // Find and sort Events by eonet_title
    Event.find()
        .sort([['eonet_title', 'ascending']])
        .exec(function (err, list_events) {

            if (err) { return next(err); }
            //Successful, so render
            res.render('events_list', { title: 'Events List', events_list: list_events });

        });
  
};

// Display detail page for a specific Event.
exports.event_detail = function(req, res, next) {

    async.parallel({
        event: function(callback) {
            Event.findById(req.params.id)
              .exec(callback)
        },
        /*events_books: function(callback) {
          Book.find({ 'author': req.params.id },'title summary')
          .exec(callback)
        },*/
    }, function(err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.event==null) { // No results.
            let err = new Error('Event not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('event_detail', { title: 'Event Detail', event: results.event } );
    });

};


//////////////////////////////


// Display Event create form on GET.
exports.event_create_get = function(req, res, next) {
    res.render('event_form', { title: 'Create Event'});
};

// Handle Event create on POST.
exports.event_create_post = [

    // Validate and sanitize fields.
    

    
    

    body('eonet_id').trim().isLength({ min: 1, max: 100 }).escape().withMessage('eonet_id must be specified.')
        .isAlphanumeric().withMessage('eonet_id has non-alphanumeric characters.'),
    body('eonet_title').trim().isLength({ min: 1, max: 100 }).escape().withMessage('eonet_title must be specified.')
        .isAlphanumeric().withMessage('eonet_title has non-alphanumeric characters.'),
    body('eonet_description').trim().isLength({ min: 1, max: 500 }).escape().withMessage('eonet_description must be specified.')
        .isAlphanumeric().withMessage('eonet_description has non-alphanumeric characters.'),
    body('eonet_link').trim().isLength({ min: 1, max: 100 }).escape().withMessage('eonet_id must be specified.')
        .isAlphanumeric().withMessage('eonet_id has non-alphanumeric characters.'),
    body('eonet_closed').trim().isLength({ min: 1, max: 100 }).escape().withMessage('eonet_id must be specified.')
        .isAlphanumeric().withMessage('eonet_id has non-alphanumeric characters.'),
    body('eonet_categories').trim().isLength({ min: 1, max: 100 }).escape().withMessage('eonet_id must be specified.')
        .isAlphanumeric().withMessage('eonet_id has non-alphanumeric characters.'),
    body('eonet_sources').trim().isLength({ min: 1, max: 100 }).escape().withMessage('eonet_id must be specified.')
        .isAlphanumeric().withMessage('eonet_id has non-alphanumeric characters.'),
    body('eonet_geometry').trim().isLength({ min: 1, max: 100 }).escape().withMessage('eonet_id must be specified.')
        .isAlphanumeric().withMessage('eonet_id has non-alphanumeric characters.'),
    
    

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('event_form', { title: 'Create Event', event: req.body, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Create an Author object with escaped and trimmed data.
            const event = new Event(
                {
                    eonet_id: req.body.eonet_id,
                    eonet_title: req.body.eonet_title,
                    eonet_description: req.body.eonet_description,
                    eonet_link: req.body.eonet_link,
                    eonet_closed: req.body.eonet_closed,
                    eonet_categories: req.body.eonet_categories,
                    eonet_sources: req.body.eonet_sources,
                    eonet_geometry: req.body.eonet_geometry,
                });
            event.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new author record.
                res.redirect(event.url);
            });
        }
    }
];

