var express = require('express');
var router = express.Router();

/* get the winning bid of a car */
router.get('/:car_id/winner', function(req, res) {

});

/* get all bids history of a car */
router.get('/:car_id', function(req, res) {

});

/* post new bid on a given car_id */
router.post('/:car_id', function (req, res) {

});

module.exports = router;