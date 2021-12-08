//import libraries and project files
const express = require('express');
const router = express.Router();
const events_controller = require("../controllers/eventsController");

/* GET events page. */
router.get('/', events_controller.index);

module.exports = router;
