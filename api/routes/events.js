//import libraries and project files
const express = require('express');
const router = express.Router();
const events_controller = require("../controllers/eventsController");

/* GET events home page */
router.get('/', events_controller.index);

/* GET events check page. */
router.get('/check', events_controller.events_check);

/* GET all events listing. */
router.get('/list', events_controller.events_list);

module.exports = router;
