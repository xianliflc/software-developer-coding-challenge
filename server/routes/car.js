var express = require('express');
var router = express.Router();
var carController = require('../controllers/carController');

/* get all available users */
// GET api/car/
router.get('/', carController.list);

module.exports = router;