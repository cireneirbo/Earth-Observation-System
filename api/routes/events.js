//import libraries and project files
const express = require('express');
const router = express.Router();
const events_controller = require("../controllers/eventsController");

/* GET events home page */
router.get('/', events_controller.index);

/* GET events list page. */
router.get('/check', events_controller.events_check);

/* GET event detail page */
router.get('/detail/:eventID', events_controller.events_detail);

module.exports = router;
