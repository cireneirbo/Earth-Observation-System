const express = require('express');
const router = express.Router();
const events_controller = require('../controllers/eventsController');

/* GET users listing. */
router.get('/', events_controller.events_list);

module.exports = router;
