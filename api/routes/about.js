const express = require('express');
const router = express.Router();
const about_controller = require("../controllers/aboutController");

/* GET home page. */
router.get('/', about_controller.index);

module.exports = router;
