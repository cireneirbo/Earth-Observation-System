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
    body('eonet_link').trim().isLength({ min: 1, max: 100 }).escape().withMessage('eonet_link must be specified.')
        .isAlphanumeric().withMessage('eonet_link has non-alphanumeric characters.'),
    body('eonet_closed').trim().isLength({ min: 1, max: 100 }).escape().withMessage('eonet_closed must be specified.')
        .isAlphanumeric().withMessage('eonet_closed has non-alphanumeric characters.'),
    body('eonet_categories').trim().isLength({ min: 1, max: 100 }).escape().withMessage('eonet_categories must be specified.')
        .isAlphanumeric().withMessage('eonet_categories has non-alphanumeric characters.'),
    body('eonet_sources').trim().isLength({ min: 1, max: 100 }).escape().withMessage('eonet_sources must be specified.')
        .isAlphanumeric().withMessage('eonet_sources has non-alphanumeric characters.'),
    body('eonet_geometry').trim().isLength({ min: 1, max: 100 }).escape().withMessage('eonet_geometry must be specified.')
        .isAlphanumeric().withMessage('eonet_geometry has non-alphanumeric characters.'),
    
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

// Display Event delete form on GET.
exports.event_delete_get = function(req, res, next) {

    async.parallel({
        event: function(callback) {
            Event.findById(req.params.id).exec(callback)
        },/*
        authors_books: function(callback) {
            Book.find({ 'author': req.params.id }).exec(callback)
        },*/
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.event==null) { // No results.
            res.redirect('/events');
        }
        // Successful, so render.
        res.render('event_delete', { title: 'Delete Event', event: results.event } );
    });

};

// Handle Event delete on POST.
exports.event_delete_post = function(req, res, next) {

    async.parallel({
        event: function(callback) {
          Event.findById(req.body.eventid).exec(callback)
        },/*
        authors_books: function(callback) {
          Book.find({ 'author': req.body.authorid }).exec(callback)
        },*/
    }, function(err, results) {
        if (err) { return next(err); }
        // Success
        /*
        if (results.authors_books.length > 0) {
            // Author has books. Render in same way as for GET route.
            res.render('author_delete', { title: 'Delete Author', author: results.author, author_books: results.authors_books } );
            return;
        }*/
        else {
            // Delete object and redirect to the list of events.
            Event.findByIdAndRemove(req.body.eventid, function deleteEvent(err) {
                if (err) { return next(err); }
                // Success - go to event list
                res.redirect('/events')
            })
        }
    });
    
};

// Display Event update form on GET.
exports.event_update_get = function(req, res, next) {
    
    // Get events for form.
    async.parallel({
        event: function(callback) {
            Event.findById(req.params.id).populate('eonet_id').populate('eonet_title').exec(callback);
        },/*
        books: function(callback) {
            Book.find(callback);
        },*/
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.event==null) { // No results.
            let err = new Error('Event not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('event_form', { title: 'Update Event', event: results.event });
    });

};

// Handle Event update on POST.
exports.event_update_post = [

    // Validate and sanitize fields.
    body('eonet_id').trim().isLength({ min: 1, max: 100 }).escape().withMessage('eonet_id must be specified.')
        .isAlphanumeric().withMessage('eonet_id has non-alphanumeric characters.'),
    body('eonet_title').trim().isLength({ min: 1, max: 100 }).escape().withMessage('eonet_title must be specified.')
        .isAlphanumeric().withMessage('eonet_title has non-alphanumeric characters.'),
    body('eonet_description').trim().isLength({ min: 1, max: 500 }).escape().withMessage('eonet_description must be specified.')
        .isAlphanumeric().withMessage('eonet_description has non-alphanumeric characters.'),
    body('eonet_link').trim().isLength({ min: 1, max: 100 }).escape().withMessage('eonet_link must be specified.')
        .isAlphanumeric().withMessage('eonet_link has non-alphanumeric characters.'),
    body('eonet_closed').trim().isLength({ min: 1, max: 100 }).escape().withMessage('eonet_closed must be specified.')
        .isAlphanumeric().withMessage('eonet_closed has non-alphanumeric characters.'),
    body('eonet_categories').trim().isLength({ min: 1, max: 100 }).escape().withMessage('eonet_categories must be specified.')
        .isAlphanumeric().withMessage('eonet_categories has non-alphanumeric characters.'),
    body('eonet_sources').trim().isLength({ min: 1, max: 100 }).escape().withMessage('eonet_sources must be specified.')
        .isAlphanumeric().withMessage('eonet_sources has non-alphanumeric characters.'),
    body('eonet_geometry').trim().isLength({ min: 1, max: 100 }).escape().withMessage('eonet_geometry must be specified.')
        .isAlphanumeric().withMessage('eonet_geometry has non-alphanumeric characters.'),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create an Event object with escaped/trimmed data and old id.
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
                _id:req.params.id //This is required, or a new ID will be assigned!
            }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            res.render('event_form', { title: 'Update Event', event: event, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            Event.findByIdAndUpdate(req.params.id, event, {}, function (err, theevent) {
                if (err) { return next(err); }
                   // Successful - redirect to event detail page.
                   res.redirect(theevent.url);
                });
        }
    }
];
